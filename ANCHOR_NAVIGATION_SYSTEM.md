# Anchor Navigation System

## Overview

The I Must Kill website now supports automatic scrolling to specific sections when using @RuleName links or anchor URLs. This enables precise navigation from Source Registry links, Rule Categorizer recommendations, and direct URL access.

## Implementation

### 1. Scroll Utility (`src/utils/scrollToAnchor.js`)

A utility function that handles smooth scrolling to elements with proper header offset:

```javascript
export const scrollToAnchor = (elementId, offset = 80) => {
    const element = document.getElementById(elementId)
    if (element) {
        const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        })
    }
}
```

### 2. Page Components Updated

All rule pages now include:

1. **useLocation import** - To detect URL hash changes
2. **scrollToAnchor import** - To use the scroll utility
3. **useEffect hook** - To handle automatic scrolling when content loads

**Updated Pages:**

-   `CharacterCreation.js`
-   `CombatMechanics.js`
-   `DeathAndResting.js`
-   `Spellcasting.js`
-   `Progression.js`
-   `RunningTheGame.js`

### 3. Element ID Structure

**Section IDs:**

-   All major sections have `id={section.id}` attributes
-   Example: `<Paper id="stats">` for the stats section

**Subsection IDs:**

-   Subsections also have proper ID attributes
-   Example: `<div id={subsection.id}>` for character creation subsections
-   Example: `<Paper id={subsection.id}>` for running the game subsections

### 4. URL Structure

**Anchor URLs follow the pattern:**

-   `/{category}#{section-id}`
-   Examples:
    -   `/character-creation#stats`
    -   `/combat-mechanics#actions`
    -   `/death-and-resting#grit-teeth`
    -   `/spellcasting#gathering-spells`

## How It Works

### 1. Source Mapping

The `useRulesEngine` hook creates source mappings that include anchor links:

```javascript
path: `/${categoryKey}#${section.id}`
```

### 2. @RuleName Resolution

The `EnhancedKeywordLinker` resolves @RuleName references to their source locations:

```javascript
if (refData.section) {
    routePath += `#${refData.section}`
}
```

### 3. Automatic Scrolling

When a page loads with a hash in the URL:

1. Wait for content to render (100ms delay)
2. Extract element ID from URL hash
3. Use `scrollToAnchor()` to smooth scroll with 80px offset
4. Account for page header/navigation

## Testing

### Manual Testing

Use the test file: `test-anchor-navigation.html`

### Key Test Cases

1. **Direct URL navigation** - Enter `/character-creation#stats` in browser
2. **Cross-page navigation** - Click @RuleName links from other pages
3. **Source Registry links** - Click links from the Source Registry tool
4. **Rule Categorizer links** - Click recommendation links
5. **Page refresh** - Refresh page with anchor, should maintain scroll position

### Expected Behavior

-   Smooth scrolling animation
-   Proper offset accounting for header
-   Works on page load and navigation
-   Handles missing elements gracefully

## Benefits

1. **Precise Navigation** - Users can jump directly to specific rules
2. **Better UX** - No manual scrolling needed to find referenced content
3. **Deep Linking** - URLs can be shared that point to specific sections
4. **Tool Integration** - Source Registry and Rule Categorizer provide accurate navigation
5. **Cross-References** - @RuleName links work seamlessly across pages

## Future Enhancements

1. **Highlight Animation** - Briefly highlight the target section after scrolling
2. **Scroll History** - Remember scroll positions for back/forward navigation
3. **Mobile Optimization** - Adjust offset for mobile headers
4. **Loading States** - Show loading indicators during navigation
5. **Error Handling** - Better feedback for broken anchor links

## Technical Notes

-   Uses React Router's `useLocation` hook for hash detection
-   Implements proper cleanup with `clearTimeout` in useEffect
-   Graceful fallback if target element doesn't exist
-   Compatible with both section and subsection navigation
-   Maintains performance with minimal re-renders
