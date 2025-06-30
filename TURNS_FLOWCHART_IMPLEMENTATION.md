# Turns Section Flowchart Implementation

## Overview

Converted the Turns section in Combat Mechanics from a simple list to a visually appealing left-to-right flowchart that clearly shows the turn order sequence.

## Changes Made

### Data Structure Update (`/public/combat-mechanics.json`)

Updated the turns section rules to follow the corrected sequence:

**Before:**

```json
"rules": [
    "Players act simultaneously, followed by monsters and NPCs",
    "The GM will inform players if their character is in danger (such as a monster targeting you with its next potential attack)",
    "GM rolls for the monsters' action(s)"
]
```

**After:**

```json
"rules": [
    "Monsters go first",
    "NPCs go next",
    "Danger is assessed and the GM tells players who is in danger",
    "Players go and then the round starts again"
]
```

### Visual Implementation (`/src/pages/CombatMechanics.js`)

#### Added Imports

-   `Box` - For flexbox layout and responsive design
-   `Chip` - For styled step indicators

#### Special Rendering Logic

Created conditional rendering that detects the "turns" section and displays it as a flowchart instead of a regular list:

```jsx
{
    section.id === "turns" ? (
        /* Turns Flowchart */
        <FlowchartImplementation />
    ) : (
        /* Regular list for other sections */
        <RegularListImplementation />
    )
}
```

## Visual Design Features

### Responsive Layout

-   **Desktop (md+)**: Horizontal left-to-right flow
-   **Mobile (xs)**: Vertical top-to-bottom flow
-   **Tablet**: Flexible wrapping as needed

### Color-Coded Steps

Each step has a unique color scheme that adapts to dark/light theme:

1. **Monsters** - Red theme (danger/priority)
2. **NPCs** - Orange theme (secondary actors)
3. **Danger Assessment** - Blue theme (information/assessment)
4. **Players** - Green theme (action/go)

### Design Elements

-   **Numbered chips** with step descriptions
-   **Arrow indicators** (→) between steps
-   **Responsive arrows** that rotate 90° on mobile for vertical flow
-   **Auto-wrapping** for different screen sizes
-   **Consistent spacing** and typography

### Theme Integration

-   **Dark Mode**: Vibrant colors with white text and gray borders
-   **Light Mode**: Pastel colors with black text and darker borders
-   **Smooth transitions** between themes

## User Experience Benefits

### Visual Clarity

-   **Clear sequence** - Easy to understand turn order at a glance
-   **Step numbering** - Reinforces the sequential nature
-   **Color coding** - Visual differentiation between actor types

### Responsive Design

-   **Mobile friendly** - Adapts to narrow screens
-   **Tablet optimized** - Flexible layout for medium screens
-   **Desktop enhanced** - Takes advantage of wide screens

### Accessibility

-   **High contrast** color schemes
-   **Clear typography** with readable fonts
-   **Logical tab order** for keyboard navigation
-   **Theme consistency** with rest of application

## Technical Implementation

### Conditional Rendering

The flowchart only applies to the "turns" section (`section.id === "turns"`), ensuring other sections continue to display as regular lists.

### Responsive Breakpoints

-   `xs` (mobile): Vertical layout with rotated arrows
-   `md+` (desktop): Horizontal layout with standard arrows

### CSS Styling

Uses Material-UI's `sx` prop for:

-   Dynamic theme-based colors
-   Responsive design patterns
-   Consistent spacing and typography
-   Smooth visual transitions

## Future Enhancement Opportunities

### Animation

-   Add subtle fade-in animations for steps
-   Implement arrow animations or pulsing effects
-   Consider step-by-step reveal animations

### Interactivity

-   Hover effects on steps for additional details
-   Click-to-expand for more detailed explanations
-   Progress indicators for ongoing combat

### Customization

-   Allow other sections to opt-in to flowchart display
-   Configurable color schemes
-   Alternative layout patterns (circular, vertical-only, etc.)

## Status

✅ **COMPLETE** - Turns section now displays as an intuitive, responsive flowchart that clearly communicates the turn sequence while maintaining compatibility with all devices and themes.
