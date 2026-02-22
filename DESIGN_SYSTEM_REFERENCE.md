# AwareGuard Learn Page - Design System Reference

## Color System

### Primary Colors
```
Slate-50:   #f8fafc (Background)
Slate-100:  #f1f5f9 (Subtle backgrounds)
Slate-200:  #e2e8f0 (Borders)
Slate-500:  #64748b (Secondary text)
Slate-600:  #475569 (Body text)
Slate-900:  #0f172a (Headings)
```

### Action Colors
```
Blue-600:   #2563eb (Primary buttons, links)
Blue-700:   #1d4ed8 (Hover state)
Indigo-600: #4f46e5 (Secondary accents)
Teal-500:   #14b8a6 (Progress bars)
Emerald-500: #10b981 (Completion, success)
Amber-600:  #d97706 (Premium, caution)
```

## Typography

### Headings
- Size: 3xl (30px) to 5xl (48px)
- Weight: Bold (700)
- Color: Slate-900
- Line Height: 1.1

### Body Text
- Size: Base (16px) to lg (18px)
- Weight: Regular (400)
- Color: Slate-600
- Line Height: 1.6

### Labels
- Size: xs (12px) to sm (14px)
- Weight: Medium (500) to Bold (700)
- Color: Slate-500
- Transform: UPPERCASE
- Letter Spacing: 0.05em

## Layout System

### Container
- Max Width: max-w-7xl (1280px)
- Padding: px-4 sm:px-6 lg:px-8
- Margin: mx-auto

### Spacing
- Section: py-12 md:py-20
- Card: p-6 md:p-8
- Grid Gap: gap-6, gap-8, gap-12

### Breakpoints
- Mobile: Default styles
- Tablet: sm: (640px)
- Desktop: lg: (1024px)
- Large: xl: (1280px)

## Component Patterns

### Cards
```jsx
className="bg-white border border-slate-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
```

### Primary Button
```jsx
className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
```

### Secondary Button
```jsx
className="border border-slate-300 text-slate-700 hover:border-blue-300 hover:text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
```

### Input/Select
```jsx
className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
```

### Badge
```jsx
className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold"
```

### Progress Bar
```jsx
className="h-2.5 bg-slate-200 rounded-full overflow-hidden"
style={{ width: `${percentage}%` }}
// Fill: from-teal-500 to-indigo-600
```

## Hero Section

### Layout
- Two columns on desktop (lg:grid-cols-2)
- Stacked on mobile
- Gap: 12 units (3rem)
- Padding: 16-20 units

### Left Column (Value Prop)
- Heading: 5xl, bold, slate-900
- Description: lg, slate-600, max-w-2xl
- Sub-bullets: flex gap-4, text-slate-600
- Button: Primary blue button

### Right Column (Progress Card)
- Background: White with subtle gradient
- Border: slate-200
- Padding: 8 units
- Contents:
  - Level badge (5xl text-blue-600)
  - XP earned (sm text-slate-600)
  - Progress bar with gradient
  - Stats grid (2 columns)

## Module Card

### States
1. **Inactive** - bg-white, border-slate-200
2. **Hover** - border-blue-300, shadow-md
3. **Completed** - bg-white, border-emerald-200
4. **Locked** - bg-slate-50, border-slate-200, opacity-60

### Badge Positions
- Completion: emerald circle with checkmark
- Lock: slate circle with lock icon
- Premium: amber circle with star

### Stats Grid
- 4 columns on desktop
- Colors: amber (XP), blue (lessons), indigo (quizzes), slate (time)
- Background: -50 variant (lighter shade)
- Padding: p-3, rounded-lg

### CTA Button
- Inactive: Blue with arrow, clickable
- Completed: Emerald background, disabled state
- Locked: Slate background, disabled

## Path Selector

### Card Design
- **Selected State:**
  - Background: Gradient from-blue-50 to-indigo-50
  - Border: border-blue-400
  - Shadow: shadow-lg
  - Badge: Blue background, checkmark icon

- **Unselected State:**
  - Background: White
  - Border: border-slate-200
  - Hover: border-blue-300, shadow-md

### Stats Display
- Grid: 3 columns
- Format: Large number + small label
- Labels: UPPERCASE, text-xs, bold, slate-500

## Premium Section

### Header
- Badge: Amber background with star icon
- Label: PREMIUM MEMBERSHIP
- Heading: 5xl, slate-900
- Description: xl, slate-600

### Features Grid
- 6 features, 3 columns
- Each: Icon emoji, title, description
- Background: slate-50, border-slate-200

### Pricing Card
- Background: Gradient from-slate-50 to-white
- Border: border-slate-200
- Toggle: slate-100 background, blue-600 when active
- Pricing: Large display with per period label

### Info Columns
- 2 columns (responsive)
- Title with icon
- Checkmark lists (blue color)
- Bullet lists (indigo color)

## Icons

### All Icons: SVG (No emoji in professional areas)

### Common Icons
- Checkmark: w-5 h-5, text-emerald-600
- Arrow: w-5 h-5, stroke-currentColor
- Lock: w-5 h-5, text-slate-600
- Star: w-5 h-5, text-amber-600
- Info: w-5 h-5, text-blue-600

### Icon Container
```jsx
className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600"
```

## Hover & Interactive States

### Button Hover
- Color transitions are smooth (duration-200)
- Shadow increases slightly (shadow-md)
- No scale transform (professional, not playful)

### Card Hover
- Border color transitions to blue-300
- Shadow increases to md
- No scale (maintains layout)

### Link Hover
- Color transitions to blue-600
- Underline may appear
- Subtle, professional

## Accessibility

### Focus States
```jsx
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
```

### Tap Targets
- Min height: 44px (mobile friendly)
- Min width: 44px
- Proper padding around clickables

### Color Contrast
- Heading: Slate-900 on slate-50+ (AAA)
- Body: Slate-600 on white (AA)
- Links: Blue-600 on white (AA)

## Responsive Design

### Mobile (Default)
- 1 column layouts
- Full width cards
- Larger touch targets
- Simplified stats displays

### Tablet (sm: 640px+)
- 2 column layouts in many areas
- Moderate padding
- Flexible spacing

### Desktop (lg: 1024px+)
- 3 column layouts where appropriate
- Max-width containers
- Generous spacing
- Full feature display

## Animation & Transitions

### Duration Standards
- Fast: duration-200 (form interactions, button hover)
- Normal: duration-300 (state changes)
- Slow: duration-500 (progress bars, major changes)

### Easing
- Default: ease-in-out
- Progress: ease-out (feels responsive)

### No Animations (Professional)
- Scale transforms on buttons (avoid)
- Slide-in effects (unless purposeful)
- Spinning loaders (unless processing)

## Visual Hierarchy

### Heading Sizes
```
5xl/4xl: Main section titles, hero text
3xl/2xl: Section subtitles
2xl/xl: Card titles, CTA headings
lg: Normal text, small titles
base/sm: Body text, descriptions
xs: Labels, secondary info
```

### Weight Hierarchy
```
Bold (700): Main headings, important labels
Semibold (600): Section titles, emphasis
Medium (500): Subheadings, button text
Regular (400): Body text, descriptions
```

### Color Hierarchy
```
Slate-900: Primary headings
Slate-600: Body text
Slate-500: Secondary info, labels
Blue-600: Links, primary actions
```

## Dark Mode (Optional Future)

### Color Mapping
```
White → slate-950
Slate-50 → slate-900
Slate-100 → slate-800
Slate-200 → slate-700
Slate-600 → slate-400
Slate-900 → slate-50
```

## Copy Guidelines

### Tone
- Professional, not playful
- Clear, not clever
- Direct, not verbose
- Empowering, not patronizing

### Button Copy
- Action-oriented: "Start Learning", "Unlock Premium"
- Not: "Click here", "Go"
- With icons: Include arrow or relevant icon

### Headings
- Benefit-focused: "Master Digital Safety"
- Authority-building: "Protect Yourself and Others"
- Specific: "Advanced Threat Mastery", not "Advanced Stuff"

### Body Copy
- Emphasize outcomes: "Skills you'll gain"
- Real-world relevance: "Learn from real-world patterns"
- Clear benefits: "Measurable progress, immediate feedback"
