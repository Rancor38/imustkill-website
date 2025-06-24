# Rules Content Management System

This document explains the major refactor that transforms the I Must Kill website into a comprehensive, JSON-driven rules wiki.

## Overview

The website has been refactored to organize all rules content into structured JSON files, making it easy to update rules and maintain consistency across the site. The system now functions like a wiki with enhanced search capabilities and automatic keyword linking.

## File Structure

### JSON Data Files (in `/public/`)

1. **`rules-database.json`** - Central hub that defines all categories and their relationships
2. **`character-creation.json`** - Character creation rules and stat information
3. **`combat-mechanics.json`** - Combat actions, damage types, and status effects
4. **`death-and-resting.json`** - Death mechanics and recovery rules
5. **`spellcasting.json`** - Magic system and spell mechanics
6. **`progression.json`** - Character advancement and insight system
7. **`running-the-game.json`** - GM resources and monster guidelines
8. **`spells.json`** - Complete spell database (existing)
9. **`equipment.json`** - Equipment and gear database (existing)
10. **`monsters.json`** - Monster bestiary (existing)

### Key Components

1. **`useRulesEngine.js`** - Hook that loads and manages all rules data
2. **`EnhancedRulesSearch.js`** - Advanced search component with autocomplete
3. **`EnhancedKeywordLinker.js`** - Automatic keyword linking system
4. **`QuickReference.js`** - Quick reference page for common rules

## How to Update Rules

### Editing Existing Rules

1. Open the appropriate JSON file in the `/public/` folder
2. Locate the section you want to edit
3. Update the content while maintaining the JSON structure
4. The changes will be automatically reflected across the website

### Adding New Sections

To add a new section to an existing category:

```json
{
    "id": "new-section-id",
    "title": "New Section Title",
    "description": "Description of the new rule or mechanic",
    "keywords": ["keyword1", "keyword2", "searchable-terms"],
    "subsections": [
        {
            "id": "subsection-id",
            "title": "Subsection Title",
            "description": "Subsection content"
        }
    ]
}
```

### Adding New Categories

1. Create a new JSON file following the existing patterns
2. Update `rules-database.json` to include the new category
3. Create a new page component if needed
4. Add routing in `App.js`

## JSON Structure Examples

### Basic Rule Section

```json
{
    "id": "unique-identifier",
    "title": "Section Title",
    "description": "Main content description",
    "keywords": ["searchable", "terms", "for", "this", "section"]
}
```

### Section with Actions (Combat Mechanics)

```json
{
    "id": "actions",
    "title": "Actions",
    "actions": [
        {
            "name": "Attack",
            "description": "How to perform an attack",
            "keywords": ["attack", "damage", "combat"]
        }
    ]
}
```

### Section with Subsections

```json
{
    "id": "character-stats",
    "title": "Character Stats",
    "subsections": [
        {
            "id": "body",
            "title": "Body",
            "description": "Physical strength and endurance",
            "keywords": ["body", "strength", "physical"]
        }
    ]
}
```

## Search System

### How Search Works

1. **Content Indexing**: All JSON content is indexed with titles, descriptions, and keywords
2. **Relevance Scoring**: Results are ranked by title matches, keyword matches, and description matches
3. **Autocomplete**: Suggestions appear based on available keywords
4. **Cross-Reference**: Search includes spells, equipment, and monsters

### Improving Search Results

To make content more discoverable:

1. Add relevant keywords to each section
2. Use consistent terminology across files
3. Include synonyms and alternative terms in keywords
4. Write clear, searchable descriptions

## Keyword Linking System

### How It Works

The `EnhancedKeywordLinker` automatically creates links between related content:

1. Scans text for keywords defined in the JSON files
2. Creates tooltips with descriptions
3. Links to the appropriate page/section
4. Works with rules, spells, equipment, and monsters

### Adding New Keywords

Keywords are automatically generated from:

-   Section titles
-   Explicitly defined keywords in JSON
-   Spell names
-   Equipment names
-   Monster names

To add custom keywords, update the `keywords` array in any JSON section.

## Page Component Updates

### Converting Hardcoded Pages

When converting a page from hardcoded content to JSON:

1. Extract the content into the appropriate JSON file
2. Update the page component to use `useRulesEngine`
3. Replace hardcoded text with dynamic content from JSON
4. Wrap text content with `EnhancedKeywordLinker`

### Example Page Structure

```javascript
const MyPage = () => {
    const { getCategoryRules, loading, error } = useRulesEngine()
    const [pageData, setPageData] = useState(null)

    useEffect(() => {
        if (!loading && !error) {
            const data = getCategoryRules("my-category")
            setPageData(data)
        }
    }, [loading, error, getCategoryRules])

    // Render logic with error handling and loading states
}
```

## Maintenance Best Practices

### 1. Consistent Structure

-   Follow existing JSON patterns
-   Use consistent naming conventions
-   Maintain the same field types across similar sections

### 2. Keywords Strategy

-   Include obvious terms (e.g., "attack" for attack rules)
-   Add synonyms and alternative phrasings
-   Include related concepts that users might search for

### 3. Cross-References

-   Link related sections through keywords
-   Use consistent terminology across different files
-   Reference specific rules when describing mechanics

### 4. Content Organization

-   Group related content in the same file
-   Use clear hierarchical structures
-   Keep descriptions concise but informative

## Advanced Features

### Quick Reference System

The quick reference page automatically displays key information from `rules-database.json`. To add content:

1. Update the `quickReference` section in `rules-database.json`
2. Follow the existing patterns for different content types
3. The page will automatically update

### Search Analytics

Monitor which terms users search for most to:

-   Identify missing content
-   Improve keyword coverage
-   Optimize content organization

## Troubleshooting

### Common Issues

1. **Content Not Appearing**: Check JSON syntax and file paths
2. **Search Not Working**: Verify keywords are properly defined
3. **Links Not Appearing**: Ensure `EnhancedKeywordLinker` is wrapping the content
4. **Loading Errors**: Check browser console for JSON parsing errors

### Development Testing

1. Start the development server: `npm start`
2. Check browser console for errors
3. Test search functionality with various terms
4. Verify keyword links are working correctly

## Future Enhancements

### Planned Features

1. **Admin Interface**: Web-based JSON editor
2. **Version Control**: Track changes to rules content
3. **Export Tools**: Generate PDFs or printable references
4. **Analytics**: Track popular searches and content
5. **Validation**: Automatic JSON structure validation

### Contributing

When adding new content:

1. Follow the established JSON patterns
2. Add comprehensive keywords
3. Test search functionality
4. Verify keyword linking works
5. Update this documentation if needed

## File Relationships

```
rules-database.json (central hub)
├── character-creation.json
├── combat-mechanics.json
├── death-and-resting.json
├── spellcasting.json
├── progression.json
├── running-the-game.json
├── spells.json (existing)
├── equipment.json (existing)
└── monsters.json (existing)
```

This system makes the I Must Kill website a comprehensive, searchable, and maintainable rules reference that functions like a wiki while being easy to update and maintain.
