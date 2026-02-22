# AwareGuard Learn Page - Visual Implementation Guide

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     HERO SECTION                             │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │ Value Prop (L)   │  │ Progress Card(R) │                 │
│  │ - Heading        │  │ - Level          │                 │
│  │ - Description    │  │ - XP Progress    │                 │
│  │ - Button         │  │ - Stats Grid     │                 │
│  └──────────────────┘  └──────────────────┘                 │
├─────────────────────────────────────────────────────────────┤
│                   PATH SELECTOR                              │
│  ┌────────────────────┐  ┌────────────────────┐             │
│  │  Foundations       │  │  Advanced          │             │
│  │  Selected: Blue    │  │  Unselected: White │             │
│  │  - Modules: 3      │  │  - Modules: 2      │             │
│  │  - XP: 1500        │  │  - XP: 1000        │             │
│  │  - Time: 4h        │  │  - Time: 3h        │             │
│  └────────────────────┘  └────────────────────┘             │
├─────────────────────────────────────────────────────────────┤
│                 GUEST MODE NOTICE                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 💡 Sign in to track progress, earn XP, maintain streak  ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│                 MODULE GRID HEADER                           │
│  Progress: 1 of 3 completed | 33% path complete            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Progress Bar (Animated teal→indigo gradient)            ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│                   MODULE CARDS                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Module 1     │  │ Module 2     │  │ Module 3     │      │
│  │ (Completed)  │  │ (Active)     │  │ (Locked)     │      │
│  │ ✓ Phishing   │  │ → Passwords  │  │ 🔒 Training  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│               LEARNING TIPS SECTION                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ ⏱ Timing   │  │ ✓ Quizzes  │  │ ⚡ Streaks │            │
│  │ Evidence-  │  │ Testing    │  │ Habit      │            │
│  │ based      │  │ strengthens│  │ formation  │            │
│  │ spacing    │  │ memory     │  │            │            │
│  └────────────┘  └────────────┘  └────────────┘            │
├─────────────────────────────────────────────────────────────┤
│              PREMIUM UPGRADE SECTION                         │
│  ⭐ PREMIUM MEMBERSHIP                                      │
│  Advanced Threat Mastery                                    │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                    │
│  │Feature 1│  │Feature 2│  │Feature 3│  ...              │
│  └─────────┘  └─────────┘  └─────────┘                    │
│                                                              │
│  Monthly: $9.99/mo | Annual: $99.99/yr (Save 17%)         │
│  [Unlock Premium →]                                         │
├─────────────────────────────────────────────────────────────┤
│           CORPORATE TRAINING SECTION                         │
│  (CorporateTraining Component)                              │
├─────────────────────────────────────────────────────────────┤
│              FINAL CTA SECTION                               │
│  Dark slate background (slate-900)                          │
│  "Protect Yourself and Others"                              │
│  [Get Started] [For Teams]                                  │
└─────────────────────────────────────────────────────────────┘
```

## Detailed Section Breakdown

### 1. HERO SECTION (Lines 125-240)

**Visual Design:**
- Background: White (bg-white)
- Border: Bottom slate-200 (border-b border-slate-200)
- Padding: Vertical 16-20 units, horizontal 4-8 units
- Max Width: 7xl container (max-w-7xl)

**Left Column (Value Prop):**
```
┌─────────────────────────────┐
│ Master Digital Safety       │ ← Heading: 5xl, bold, slate-900
│                             │
│ Learn cybersecurity from... │ ← Description: lg, slate-600
│ • Structured modules        │ ← Sub-bullets: 4 benefits
│ • Immediate feedback        │ ← Each with bullet, slate-600
│ • Measurable progress       │
│ • Real-world scenarios      │
│                             │
│ [Start Learning →]          │ ← CTA: blue-600, hover:blue-700
└─────────────────────────────┘
```

**Right Column (Progress Card):**
```
┌─────────────────────────────┐
│ Level 5                     │ ← Bold, large, blue-600
│ 2,450 XP earned            │ ← Small gray text
│                             │
│ Progress to Level 6         │ ← Label: small, bold, slate-700
│ [═════════════════ ] 450XP  │ ← Animated gradient bar
│                             │
│ ┌─────────┐ ┌─────────┐    │ ← Stats grid: 2 columns
│ │ Modules │ │ Streak  │    │
│ │    3    │ │    7    │    │
│ │completed│ │days     │    │
│ └─────────┘ └─────────┘    │
└─────────────────────────────┘
```

### 2. PATH SELECTOR (Lines 241-280)

**Section Header:**
```
Choose Your Learning Path
Select a path aligned with your goals. Switch anytime as you progress.
```

**Card Layout (2 columns):**

**Unselected Card:**
```
┌──────────────────────────────┐
│ Beginner Foundations         │ ← Heading: 2xl, slate-900
│                              │
│ Master essential knowledge   │ ← Description: slate-600
│ every person needs           │
│                              │
│ ─────────────────────────── │ ← Border-top: slate-200
│ Modules: 3 | Total XP: 1500 │ ← Stats: 3 columns
│ Est. Time: 4h               │
└──────────────────────────────┘
```

**Selected Card:**
```
┌──────────────────────────────┐
│ Advanced Techniques      ✓   │ ← Badge: Blue background
│ (Selected)                   │
│ [text same but highlighted]  │
│ [stats highlighted in blue]  │
└──────────────────────────────┘
```

### 3. MODULE GRID (Lines 281-340)

**Progress Tracking Header:**
```
┌────────────────────────────────┐
│ Your Progress          33%      │ ← Left: text, Right: percentage
│ 1 of 3 completed modules        │
│                                 │
│ [════════════════     ] Progress│ ← Animated bar: teal→indigo
│ Grid gap adjusts at breakpoints │
└────────────────────────────────┘
```

**Module Cards in Grid:**
- Desktop: 3 columns (lg:grid-cols-3)
- Tablet: 2 columns (md:grid-cols-2)
- Mobile: 1 column
- Gap: 6 units (gap-6)

**Completed Path Message:**
```
┌────────────────────────────────┐
│ ✓                              │ ← Icon: emerald circle
│ Path Complete!                 │ ← Bold headline
│ You've mastered all modules... │ ← Supporting text
│                                │
│ Explore the other path to      │ ← Call to action
│ deepen your expertise.         │
└────────────────────────────────┘
```

### 4. PREMIUM LOCK NOTICE (Lines 341-360)

**Visible when:** Free user on Advanced path

```
┌────────────────────────────────────┐
│ 🔒                                 │ ← Lock icon (amber)
│ Premium Content                    │ ← Heading: amber-900
│                                    │
│ These modules contain advanced...  │ ← Description: amber-800
│                                    │
│ [Unlock Premium →]                 │ ← Button: amber-600
└────────────────────────────────────┘
```

Background: amber-50, border: amber-200

### 5. LEARNING TIPS SECTION (Lines 361-410)

**Header:**
```
How to Learn Effectively
Evidence-based strategies to maximize retention and real-world application
```

**Three-Column Grid:**

```
┌──────────────────┐
│ ⏱ (blue icon)    │ ← Icon: blue-100 background
│                  │
│ Take Your Time   │ ← Title: slate-900, bold
│                  │
│ Spacing out...   │ ← Description: slate-600
│ retention by... │
└──────────────────┘

┌──────────────────┐
│ ✓ (indigo icon)  │
│ Complete Quizzes │
│ Testing yourself │
│ strengthens...   │
└──────────────────┘

┌──────────────────┐
│ ⚡ (teal icon)   │
│ Build Your Streak│
│ Consistent       │
│ learning...      │
└──────────────────┘
```

### 6. PREMIUM UPGRADE (Lines 411-460)

**Header Section:**
```
⭐ PREMIUM MEMBERSHIP
Advanced Threat Mastery

Unlock advanced modules, real-world simulations, and verifiable 
certificates to become a recognized security expert.
```

**Features Grid:** 6 items, 3 columns
```
Each feature:
┌──────────────────┐
│ 🎓 (icon)        │
│ All Advanced     │
│ Modules          │
│ Social eng...    │
└──────────────────┘
```

**Pricing Card:**
```
┌────────────────────────────────┐
│ [Monthly] [Annual] [Save 17%]  │ ← Toggle buttons
│                                │
│ $9.99                          │ ← Large price display
│ per month                      │
│                                │
│ [Unlock Premium →]             │ ← CTA button
│                                │
│ ✓ Cancel anytime • No setup... │ ← Trust signals
└────────────────────────────────┘
```

**Two-Column Info:**
```
Left Column (Why Upgrade):     Right Column (Perfect For):
✓ Learn from real scenarios    • Security professionals
✓ Get personalized recs.       • High-value individuals
✓ Earn certificates            • Organizations
✓ Priority support             • Serious learners
```

### 7. FINAL CTA (Lines 461-490)

**Background:** Dark slate-900

**Content:**
```
Protect Yourself and Others

Every person deserves to feel confident navigating the 
digital world safely. Start your learning journey today.

[Get Started Free →] [For Teams →]
```

- Heading: Large, white text
- Description: slate-300 text
- Buttons: Blue primary, slate border secondary

## Responsive Behavior

### Mobile (< 640px)
- Hero: Stacked (1 column)
- Path selector: Full width cards
- Module grid: 1 column
- Tips: 1 column
- Premium: Single column layout

### Tablet (640px - 1023px)
- Hero: 2 columns
- Path selector: 2 columns
- Module grid: 2 columns
- Tips: 2 columns
- Premium: 2 columns

### Desktop (1024px+)
- Hero: 2 columns with max-w-7xl
- Path selector: 2 columns
- Module grid: 3 columns
- Tips: 3 columns
- Premium: Full layout with info columns

## Interaction States

### Buttons
- **Default:** bg-blue-600, sharp shadow, cursor pointer
- **Hover:** bg-blue-700, shadow-md
- **Active:** bg-blue-800
- **Focus:** ring-2 ring-blue-500 ring-offset-2
- **Disabled:** bg-slate-100, text-slate-600, cursor-not-allowed

### Cards
- **Default:** border-slate-200, no shadow
- **Hover:** border-blue-300, shadow-md
- **Selected:** border-blue-400 or emerald-200

### Inputs (if added)
- **Default:** border-slate-300
- **Focus:** ring-2 ring-blue-500 ring-offset-2
- **Error:** border-red-300, ring-red-500

## Color Application Rules

### When to use Slate
- Backgrounds (slate-50, slate-100)
- Borders (slate-200)
- Text (slate-600, slate-900)
- Disabled states (slate-300, slate-400)

### When to use Blue
- Primary buttons
- Primary links
- Active selections
- Important highlights

### When to use Amber
- Premium badges
- Caution/warning info
- Premium pricing section

### When to use Emerald/Teal
- Completion checkmarks
- Success states
- Progress indicators

### Never Use
- Gray (use Slate instead)
- Random bright colors
- Too many colors in one view
- Color-only status indicators (always pair with text/icon)

## Typography Application Rules

### Heading Sizes
- Page title: 5xl, bold, slate-900
- Section title: 2xl-3xl, bold, slate-900
- Card title: lg, bold, slate-900
- Label: xs, bold, uppercase, slate-500

### Font Weights
- Never use anything lighter than Regular (400)
- Headings: Always Bold (700)
- Labels: Semibold (600) or Bold (700)
- Body: Regular (400)

### Line Heights
- Headings: 1.1-1.2 (tight)
- Body text: 1.6 (generous)
- Labels: 1.2 (normal)

## Spacing Rules

### Padding
- Card: p-6 (small) to p-8 (large)
- Section: py-12 (normal) to py-20 (large)
- Container: px-4 sm:px-6 lg:px-8

### Margins
- Between sections: mb-12 to mb-16
- Between cards: Gap 6-8 units
- Text spacing: mb-2 (tight) to mb-4 (generous)

### Whitespace
- Never cramped (min padding 4 units)
- Never excessive (max padding 12 units per side)
- Breathing room between sections

## Quality Checklist

When implementing new components, verify:

- [ ] Color scheme matches (slate/blue/accent)
- [ ] Typography hierarchy clear (size, weight)
- [ ] Spacing consistent (padding, margins)
- [ ] Icons are SVG (not emoji in professional areas)
- [ ] Buttons responsive (touch targets 44px+)
- [ ] States defined (hover, active, focus, disabled)
- [ ] Responsive layout (mobile/tablet/desktop)
- [ ] Contrast meets WCAG AA standard
- [ ] No playful effects (scale, spin)
- [ ] Professional tone throughout
