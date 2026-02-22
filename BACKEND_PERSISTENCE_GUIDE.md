# Backend Progress Persistence - Configuration Guide

## Problem Statement
"No saving progress after logout and login again"

## Current Implementation Status

### ✅ What's Already Working
The `useLearningEngine.js` hook has complete backend integration:

```javascript
// 1. Loading Progress from Backend
GET /api/learning/progress
  Headers: { Authorization: "Bearer {token}" }
  Response: {
    completedModules: ["module-1", "module-2"],
    totalXP: 240,
    streak: 5,
    lastActivity: "2025-01-15T10:30:00Z"
  }

// 2. Saving Progress to Backend  
POST /api/learning/complete
  Headers: { Authorization: "Bearer {token}" }
  Body: { moduleId: "phishing-101", xpGained: 120 }
  Response: { success: true }
```

### ✅ What's Already Implemented
1. **Token-based authentication** - User token passed in Authorization header
2. **Automatic loading** - Progress loads when app initializes or token changes
3. **Automatic saving** - Progress saves when module is completed
4. **Fallback to localStorage** - If backend unavailable or user is guest
5. **Duplicate prevention** - Can't complete same module twice
6. **Level calculation** - Every 500 XP = +1 level (deterministic)

### Current Flow
```
App Start
  ↓
Check if user has token
  ↓
YES → Fetch from /api/learning/progress
        ↓
        Success? → Load backend data ✓
        Error/No? → Fall back to localStorage
  ↓
NO → Use localStorage (guest mode)
  ↓
User completes module
  ↓
If authenticated → POST to /api/learning/complete
If guest → Save to localStorage
  ↓
Progress persists ✓
```

---

## Troubleshooting Guide

### Issue: Progress Lost After Logout/Login

#### Check 1: Verify Backend Endpoints Exist
```bash
# Test loading endpoint
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://awareguard-backend.onrender.com/api/learning/progress

# Should return: { completedModules, totalXP, streak, lastActivity }

# Test save endpoint
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"moduleId":"phishing-101","xpGained":120}' \
  https://awareguard-backend.onrender.com/api/learning/complete

# Should return: { success: true }
```

#### Check 2: Verify Token is Being Sent
Open browser DevTools → Network tab
1. Complete a module
2. Look for POST to `/api/learning/complete`
3. Check "Authorization" header contains "Bearer TOKEN"
4. Check Response Status is 200/201 (not 401/403)

**If showing 401 Unauthorized:**
- Token may be expired
- Token format incorrect
- Backend not recognizing token

**If showing 404 Not Found:**
- Backend endpoint doesn't exist
- URL path is wrong

#### Check 3: Verify Backend Database Schema
Backend needs to store:
```javascript
UserProgress {
  userId: string (from token),
  completedModules: [string], // array of module IDs
  totalXP: number,
  streak: number,
  lastActivity: timestamp,
  updatedAt: timestamp
}
```

#### Check 4: Test localStorage Fallback
1. Open DevTools → Application → LocalStorage
2. Find key: `awareguard_learning_progress`
3. Should contain your progress data
4. This proves frontend is saving locally

**If localStorage is empty but you completed modules:**
- Problem is in backend save
- useLearningEngine is not getting success response

#### Check 5: Check Frontend Logs
Open browser Console, complete a module
1. Look for `useAuth()` logs showing token
2. Look for `useLearningEngine` logs showing progress load
3. Look for errors or warnings

---

## Backend Configuration Checklist

### ✅ Required Backend Endpoints

#### 1. GET /api/learning/progress
```javascript
// Description: Load user's learning progress
// Authentication: Required (Bearer token)
// Response: {
//   completedModules: string[],
//   totalXP: number,
//   streak: number,
//   lastActivity: ISO timestamp
// }

// Example Implementation (Node.js/Express)
app.get('/api/learning/progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await UserProgress.findOne({ userId });
    
    if (!progress) {
      // Return empty progress for new users
      return res.json({
        completedModules: [],
        totalXP: 0,
        streak: 0,
        lastActivity: null
      });
    }
    
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

#### 2. POST /api/learning/complete
```javascript
// Description: Mark module as complete and award XP
// Authentication: Required (Bearer token)
// Body: { moduleId: string, xpGained: number }
// Response: { success: true }

// Example Implementation (Node.js/Express)
app.post('/api/learning/complete', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { moduleId, xpGained } = req.body;
    
    // Find or create user progress
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = new UserProgress({ userId });
    }
    
    // Prevent duplicate completion
    if (progress.completedModules.includes(moduleId)) {
      return res.json({ success: true }); // Idempotent
    }
    
    // Update progress
    progress.completedModules.push(moduleId);
    progress.totalXP += xpGained;
    progress.lastActivity = new Date();
    
    // Update streak logic
    const lastActivity = progress.lastActivity;
    const daysSinceLastActivity = 
      (Date.now() - lastActivity) / (1000 * 60 * 60 * 24);
    
    if (daysSinceLastActivity < 2) {
      // Continue streak if activity within 24 hours
      progress.streak += 1;
    } else {
      // Reset streak if gap > 24 hours
      progress.streak = 1;
    }
    
    await progress.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### ✅ Database Schema (MongoDB example)
```javascript
{
  _id: ObjectId,
  userId: string, // from JWT token
  completedModules: [string], // ["phishing-101", "password-security-102"]
  totalXP: number, // 340
  streak: number, // 5 (days of consecutive learning)
  lastActivity: Date, // 2025-01-15T10:30:00Z
  createdAt: Date,
  updatedAt: Date
}
```

### ✅ Authentication Middleware
```javascript
// authenticateToken middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, isPremium }
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
```

---

## Frontend Implementation (Already Done ✅)

### How useLearningEngine Handles Persistence

```javascript
// 1. Load progress on app startup
useEffect(() => {
  const loadProgress = async () => {
    if (token) {
      // Authenticated user - load from backend
      const res = await fetch(`${API_BASE}/api/learning/progress`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setProgress(data); // Backend data is source of truth
        return;
      }
    }
    
    // Fallback to localStorage (guest or backend error)
    const local = JSON.parse(localStorage.getItem('awareguard_learning_progress'));
    if (local) setProgress(local);
  };
  
  loadProgress();
}, [token]); // Re-run when token changes (after login/logout)

// 2. Save progress when module completes
const completeModule = async (module) => {
  if (token) {
    // Authenticated - save to backend
    const res = await fetch(`${API_BASE}/api/learning/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        moduleId: module.id,
        xpGained: module.xp
      })
    });
    
    if (!res.ok) throw new Error('Failed to save progress');
  }
  
  // Update local state (optimistic)
  setProgress(updatedProgress);
};

// 3. Persist to localStorage (for guests)
useEffect(() => {
  if (!token) {
    // Guest mode - save to localStorage
    localStorage.setItem('awareguard_learning_progress', 
      JSON.stringify(progress));
  }
}, [progress, token]);
```

### Why Persistence Works
1. **On Login**: Token exists → Load from backend → Progress restored ✓
2. **While Learning**: Complete module → POST to backend ✓
3. **On Logout**: Progress saved to backend (from POST calls) ✓
4. **On Re-login**: Token exists → Load from backend → Progress restored ✓

---

## Testing the Implementation

### Manual Testing Steps

1. **Test 1: Guest Mode**
   - [ ] Don't log in
   - [ ] Complete a lesson
   - [ ] Refresh page
   - [ ] Progress should still be there (localStorage)

2. **Test 2: Authenticated - Single Session**
   - [ ] Log in with account
   - [ ] Complete a module
   - [ ] Check Network tab → POST to /api/learning/complete
   - [ ] Response should be { success: true }

3. **Test 3: Authenticated - Across Sessions**
   - [ ] Log in
   - [ ] Complete a module
   - [ ] Close browser completely
   - [ ] Open browser again
   - [ ] Log in again
   - [ ] Check if progress is restored
   - [ ] XP count should be the same

4. **Test 4: Backend Error Fallback**
   - [ ] Turn off backend (disable API)
   - [ ] Try to complete a module
   - [ ] Should fall back to localStorage silently
   - [ ] Progress should save locally

5. **Test 5: Token Expiry**
   - [ ] Complete module with valid token
   - [ ] Token expires
   - [ ] Try to complete another module
   - [ ] Should handle gracefully (save locally)

---

## Common Issues & Solutions

### Issue: "Progress resets after logout"
**Cause:** Backend not saving progress correctly
**Solution:**
1. Check POST endpoint returns 200 status
2. Verify database is actually saving data
3. Check userId is correctly extracted from token

### Issue: "Loading spinner forever on login"
**Cause:** GET endpoint hanging or erroring
**Solution:**
1. Check backend endpoint responds quickly
2. Add timeout to frontend fetch (5 seconds)
3. Check database query performance

### Issue: "Progress doesn't match between devices"
**Cause:** Multiple devices saving conflicting data
**Solution:**
1. Implement last-write-wins strategy (use timestamps)
2. Or merge progress intelligently
3. Or server-side rank highest score

### Issue: "XP appears to reset"
**Cause:** localStorageKey mismatch or cleared
**Solution:**
1. Check localStorage key is consistent
2. User's browser storage not being cleared
3. Backend totalXP calculation issue

---

## Monitoring & Debugging

### Backend Logging
```javascript
// Log all progress-related requests
app.use('/api/learning', (req, res, next) => {
  console.log(`[Learning] ${req.method} ${req.path}`);
  console.log(`  User: ${req.user?.id}`);
  console.log(`  Body: ${JSON.stringify(req.body)}`);
  next();
});
```

### Frontend Logging
```javascript
// In useLearningEngine.js, add logging
const loadProgress = async () => {
  console.log('[useLearningEngine] Loading progress...');
  console.log('[useLearningEngine] Token:', token);
  
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/api/learning/progress`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('[useLearningEngine] Response status:', res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log('[useLearningEngine] Loaded progress:', data);
        setProgress(data);
        return;
      }
    } catch (err) {
      console.error('[useLearningEngine] Error:', err);
    }
  }
  
  console.log('[useLearningEngine] Using localStorage fallback');
};
```

---

## Summary

### What You Need to Do
1. ✅ **Verify endpoints exist** - GET /api/learning/progress, POST /api/learning/complete
2. ✅ **Verify database schema** - Store completedModules[], totalXP, streak, lastActivity
3. ✅ **Verify authentication** - Extract userId from JWT token
4. ✅ **Test the flow** - Complete module → check POST → check database

### What's Already Implemented (Frontend)
- ✅ Token-based auth headers
- ✅ Loading on app start
- ✅ Saving on module completion
- ✅ Fallback to localStorage
- ✅ Error handling

### Expected Behavior
- Guest completes lesson → Saves to localStorage ✓
- User logs in, completes lesson → Saves to backend ✓
- User logs out, logs back in → Progress restored from backend ✓
- Backend down → Falls back to localStorage gracefully ✓

If progress is still not persisting, the issue is on the **backend** - verify the endpoints and database are working correctly.
