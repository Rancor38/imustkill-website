# Turns Flowchart Number Removal

## Overview

Removed explicit numbers from the turns flowchart chips since the left-to-right position already implies the sequential order.

## Change Made

### Number Removal

-   **Previous**: `label={`${index + 1}. ${rule}`}`
-   **Updated**: `label={rule}`
-   **Result**: Cleaner text without redundant numbering

## Visual Benefits

### Cleaner Appearance

-   **Less visual clutter**: Removed redundant "1.", "2.", "3.", "4." prefixes
-   **Focus on content**: Text describes the actual turn actions without numerical distraction
-   **Professional look**: Streamlined appearance that relies on spatial positioning

### Implicit Ordering

-   **Left-to-right flow**: Position clearly indicates sequence
-   **Arrow connections**: Visual flow guides show progression
-   **Intuitive navigation**: Users naturally read from left to right

### Better Text Utilization

-   **More space for content**: Removing numbers gives rule text more room
-   **Improved readability**: Focus is on the actual turn actions
-   **Cleaner typography**: No mixed number/text formatting

## Design Philosophy

### Spatial Communication

-   **Position indicates order**: Grid layout inherently shows sequence
-   **Visual hierarchy**: Flow is communicated through layout, not numbering
-   **Reduced redundancy**: Eliminates duplicate information

### Content Focus

-   **Rule text prominence**: The actual turn actions are the important information
-   **Simplified presentation**: Less visual noise allows better content absorption
-   **Professional design**: Clean, uncluttered appearance

## Current Flow

The flowchart now displays as:

```
[Monsters go first] ▶ [NPCs go next] ▶ [Danger is assessed...] ▶ [Players go...]
```

Instead of:

```
[1. Monsters go first] ▶ [2. NPCs go next] ▶ [3. Danger is assessed...] ▶ [4. Players go...]
```

## Benefits

-   **Cleaner visual design** with less text density
-   **Improved readability** by focusing on actual content
-   **Professional appearance** that trusts spatial design over explicit numbering
-   **Better use of available space** within each chip

## Status

✅ **COMPLETE** - Turns flowchart now uses implicit positional ordering instead of explicit numbers for a cleaner, more professional appearance.
