# Turns Flowchart Size Increase

## Overview

Increased the size of the turns flowchart boxes to better accommodate the text content and improve readability.

## Changes Made

### Container Height Increase

-   **Previous**: `height: { xs: "auto", sm: "120px" }`
-   **Updated**: `height: { xs: "auto", sm: "160px", md: "180px" }`
-   **Benefit**: 33% height increase on small screens, 50% increase on medium+ screens

### Enhanced Text Padding

-   **Previous**: `padding: { xs: "6px 4px", sm: "8px 6px" }`
-   **Updated**: `padding: { xs: "8px 6px", sm: "12px 10px" }`
-   **Benefit**: More comfortable text spacing within each box

### Improved Typography

-   **Font size enhancement**: Added responsive sizing `{ xs: "0.8rem", sm: "0.85rem" }`
-   **Line height optimization**: Increased from `1.2` to `1.3` for better readability
-   **Better text breathing**: More space around text content

## Visual Improvements

### Better Text Accommodation

-   **Longer text content** fits more comfortably without feeling cramped
-   **Multi-line text** has proper spacing between lines
-   **Enhanced readability** with improved text-to-container ratios

### Responsive Scaling

-   **Mobile (xs)**: Maintains auto-sizing for flexible content
-   **Tablet (sm)**: 160px height provides good balance
-   **Desktop (md+)**: 180px height gives optimal text space

### Professional Appearance

-   **Balanced proportions** between text and container
-   **Consistent visual weight** across all four turn steps
-   **Enhanced user experience** with easier-to-read content

## Technical Details

### Container Sizing

```css
height: { xs: "auto", sm: "160px", md: "180px" }
```

### Text Padding

```css
padding: { xs: "8px 6px", sm: "12px 10px" }
```

### Typography

```css
fontSize: { xs: "0.8rem", sm: "0.85rem" }
lineHeight: 1.3
```

## Benefits

### Improved Readability

-   **More text space**: Content is no longer cramped within boxes
-   **Better visual hierarchy**: Text stands out clearly within containers
-   **Enhanced user experience**: Easier to read and understand turn sequence

### Better Content Fit

-   **Accommodates longer text**: Rules with more detail fit comfortably
-   **Future-proof**: Can handle additional text content if rules are expanded
-   **Professional appearance**: Proper text-to-container spacing ratios

## Status

✅ **COMPLETE** - Turns flowchart boxes now provide optimal text accommodation with increased height and improved padding for enhanced readability.
