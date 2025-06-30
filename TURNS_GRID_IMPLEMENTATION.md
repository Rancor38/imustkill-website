# Turns Section Grid Flowchart Update

## Overview

Updated the Turns section flowchart from a flexible layout to a structured 4-column grid with arrows between each column for improved visual organization and consistency.

## Grid Implementation

### Layout Structure

```
[Step 1] → [Step 2] → [Step 3] → [Step 4]
   Col 1   Col 2   Col 3   Col 4   Col 5   Col 6   Col 7
```

### Technical Implementation

-   **CSS Grid**: Uses `display: grid` with 7 columns total
-   **4 Step Columns**: Each step occupies one column
-   **3 Arrow Columns**: Arrows positioned between steps
-   **Responsive Design**: Collapses to single column on mobile

### Grid Column Mapping

-   **Column 1**: Monsters go first
-   **Column 2**: Arrow →
-   **Column 3**: NPCs go next
-   **Column 4**: Arrow →
-   **Column 5**: Danger is assessed and the GM tells players who is in danger
-   **Column 6**: Arrow →
-   **Column 7**: Players go and then the round starts again

## Visual Improvements

### Enhanced Spacing

-   **Consistent gaps** between all elements
-   **Improved alignment** with grid positioning
-   **Better proportions** with structured column widths

### Enhanced Step Design

-   **Larger padding** for better visual weight
-   **Enhanced shadows** for depth and separation
-   **Improved typography** with better line spacing
-   **Optimized sizing** for grid layout

### Arrow Enhancement

-   **Larger arrows** (h3 instead of h4) for better visibility
-   **Better positioning** with precise grid placement
-   **Improved responsive behavior** with rotation on mobile

## Responsive Behavior

### Desktop (sm+)

-   **7-column grid**: Full horizontal layout
-   **Standard arrows**: Horizontal → indicators
-   **Optimal spacing**: Each step gets adequate space

### Mobile (xs)

-   **Single column**: Vertical stack layout
-   **Rotated arrows**: 90° rotation for vertical flow
-   **Compact design**: Maintains readability on narrow screens

## Benefits of Grid Layout

### Visual Consistency

-   **Equal column widths** ensure balanced appearance
-   **Predictable spacing** between all elements
-   **Professional layout** with structured alignment

### Maintainability

-   **Clear positioning logic** with explicit grid coordinates
-   **Easy to modify** column proportions if needed
-   **Scalable design** for potential future steps

### User Experience

-   **Clear visual hierarchy** with structured layout
-   **Easy to follow** left-to-right progression
-   **Professional appearance** that matches the overall design system

## Implementation Details

### Grid Template

```css
gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(7, 1fr)"
}
```

### Step Positioning

```css
gridColumn: {
    xs: "1",
    sm: `${index * 2 + 1} / ${index * 2 + 2}`
}
```

### Arrow Positioning

```css
gridColumn: {
    xs: "1",
    sm: `${index * 2 + 2} / ${index * 2 + 3}`
}
```

## Status

✅ **COMPLETE** - Turns section now displays as a structured 4-column grid with proper spacing and arrow placement, providing a more organized and professional appearance.
