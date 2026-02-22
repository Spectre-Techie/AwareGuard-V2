# Backend Files to Create/Update

## Files to Create in Your Backend Repository

These files should be created in the `awareguard-backend` repository. Copy each file's content and paste into your backend project.

### 1. **models/Quiz.js** - MongoDB Schema for Quizzes
See: `Quiz.js` file attached below

### 2. **models/UserProgress.js** - Enhanced Progress Tracking
See: `UserProgress.js` file attached below

### 3. **routes/api/quizzes.js** - Quiz API Endpoints
See: `quizzes.js` file attached below

### 4. **routes/api/lessons.js** - Lesson API Endpoints  
See: `lessons.js` file attached below

### 5. **controllers/quizController.js** - Quiz Logic
See: `quizController.js` file attached below

### 6. **middleware/validateQuiz.js** - Quiz Validation
See: `validateQuiz.js` file attached below

### 7. **config/quizConfig.js** - Quiz Configuration
See: `quizConfig.js` file attached below

## Integration Steps

1. Create the `models/` directory if it doesn't exist
2. Create the `routes/api/` directory if it doesn't exist
3. Create the `controllers/` directory if it doesn't exist
4. Create the `middleware/` directory if it doesn't exist
5. Create the `config/` directory if it doesn't exist
6. Paste each file into the appropriate location
7. Update `index.js` or `server.js` to import these routes:

```javascript
// In your main server file (index.js or server.js)
const quizRoutes = require('./routes/api/quizzes');
const lessonRoutes = require('./routes/api/lessons');

// Add these routes:
app.use('/api/quizzes', quizRoutes);
app.use('/api/lessons', lessonRoutes);
```

## Database Collections Required

You'll need these MongoDB collections (they'll auto-create):
- `quizzes` - Quiz questions and answers
- `user_progress` - User progress tracking
- `quiz_submissions` - User quiz attempts and scores
- `lessons` - Lesson content and metadata

## Environment Variables Needed

None new - uses existing JWT and DB connection

---

## Files Content Below ⬇️

