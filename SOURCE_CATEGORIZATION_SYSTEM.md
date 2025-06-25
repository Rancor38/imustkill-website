# %Source and @RuleName Categorization System

## Overview

The %Source and @RuleName system provides a comprehensive way to track rule definitions and ensure consistent categorization across your I Must Kill website. This system creates authoritative sources for rules and enables systematic linking throughout the content.

## How the System Works

### %Source Annotations

The `%Source` field in JSON sections defines which @RuleName tags are officially defined in that section. This creates the authoritative source mapping.

**Example:**

```json
{
    "id": "stats",
    "title": "Stats",
    "%Source": ["@Body", "@Agility", "@Focus", "@Fate"],
    "content": [
        // ... stat definitions
    ]
}
```

### @RuleName Tags

Throughout your content, use @RuleName tags to reference rules. These automatically link back to their %Source definitions.

**Example:**

```json
{
    "description": "Roll 1d10 against @AttackStat. Deal 1 @PhysicalDamage on success."
}
```

## Current Source Mappings

### Character Creation (`character-creation.json`)

-   **Stats Section** (`%Source: ["@Body", "@Agility", "@Focus", "@Fate"]`)

    -   @Body: Physical strength and endurance
    -   @Agility: Speed and dexterity
    -   @Focus: Mental concentration and magical ability
    -   @Fate: Luck, life force, and destiny

-   **Basic Mechanics** (`%Source: ["@Advantage", "@Disadvantage"]`)

    -   @Advantage: Roll 2d10, choose lower result
    -   @Disadvantage: Roll 2d10, choose higher result

-   **Attack Stat and Hit Points** (`%Source: ["@AttackStat", "@HitPoints"]`)
    -   @AttackStat: Chosen stat for combat rolls
    -   @HitPoints: Hit points calculation from Fate

### Combat Mechanics (`combat-mechanics.json`)

-   **Actions Section** (`%Source: ["@Attack", "@Dodge", "@Brace", "@Gather", "@Flee", "@Negotiate"]`)

    -   @Attack: Combat action to deal damage
    -   @Dodge: Agility-based defense action
    -   @Brace: Body-based defense requiring equipment
    -   @Gather: Action to collect spells using Focus
    -   @Flee: Action to escape combat
    -   @Negotiate: Diplomacy action in combat

-   **Damage Types** (`%Source: ["@PhysicalDamage", "@SpiritualDamage", "@HybridDamage"]`)

    -   @PhysicalDamage: Conventional weapon damage
    -   @SpiritualDamage: Divine/holy damage vs supernatural
    -   @HybridDamage: Combined physical/spiritual damage

-   **Statuses** (`%Source: ["@Frightened", "@Unconscious", "@Diseased"]`)
    -   @Frightened: Cannot attack or move towards fear source
    -   @Unconscious: Cannot defend, attacks auto-succeed
    -   @Diseased: All tests with disadvantage

### Death and Resting (`death-and-resting.json`)

-   **Grit Teeth** (`%Source: ["@GritTeeth"]`)

    -   @GritTeeth: Recover 1 HP during combat respite

-   **Night's Rest** (`%Source: ["@NightsRest"]`)
    -   @NightsRest: Full recovery after comfortable rest

### Spellcasting (`spellcasting.json`)

-   **Gathering Spells** (`%Source: ["@GatherSpells"]`)

    -   @GatherSpells: Focus test to draw spells from deck

-   **Casting Spells** (`%Source: ["@CastSpells"]`)
    -   @CastSpells: Playing spell cards to trigger effects

### Progression (`progression.json`)

-   **Leveling Up** (`%Source: ["@LevelingUp"]`)

    -   @LevelingUp: Character advancement after surviving fights

-   **Insight** (`%Source: ["@Insight"]`)
    -   @Insight: Perception stat for hidden creatures and rerolls

### Running the Game (`running-the-game.json`)

-   **Hidden Creatures** (`%Source: ["@HiddenCreatures"]`)

    -   @HiddenCreatures: Creatures requiring Insight to perceive

-   **Monster Tables** (`%Source: ["@WindUp", "@MonsterTables"]`)
    -   @WindUp: Monster mechanic that doubles next attack damage
    -   @MonsterTables: System for determining monster actions

## Tools for Management

### Source Registry (`/source-registry`)

-   **View all %Source mappings** organized by category
-   **Identify uncategorized rules** that need %Source annotations
-   **Track source relationships** between rules and their definitions
-   **Systematic overview** of the entire rule system

### Rule Categorizer (`/rule-categorizer`)

-   **Analyze content** for potential @RuleName usage
-   **Find missing references** where @RuleName tags should be added
-   **Generate recommendations** for systematic categorization
-   **Identify inconsistencies** in rule usage across the site

## Systematic Categorization Process

### Step 1: Define Sources

1. Add `%Source` arrays to JSON sections that define rules
2. List all @RuleName tags that section officially defines
3. Ensure each rule has one primary authoritative source

### Step 2: Add @RuleName References

1. Scan content for rule references
2. Replace plain text with @RuleName tags where appropriate
3. Use the Rule Categorizer tool to find potential additions
4. Ensure consistent usage across all content

### Step 3: Validate and Maintain

1. Use Source Registry to review mappings
2. Check for uncategorized rules
3. Add missing @RuleName entries to rules-database.json
4. Regularly audit for consistency

## Examples of Good Categorization

### Before (uncategorized):

```json
{
    "description": "Roll 1d10 against your attack stat. Deal 1 damage on success."
}
```

### After (categorized):

```json
{
    "description": "Roll 1d10 against @AttackStat. Deal 1 @PhysicalDamage on success."
}
```

### Before (no source):

```json
{
    "id": "combat-actions",
    "title": "Combat Actions",
    "actions": [...]
}
```

### After (with source):

```json
{
    "id": "combat-actions",
    "title": "Combat Actions",
    "%Source": ["@Attack", "@Dodge", "@Brace"],
    "actions": [...]
}
```

## Benefits of This System

1. **Consistency**: Ensures uniform rule references across the site
2. **Navigation**: Users can click @RuleName tags to jump to definitions
3. **Maintenance**: Easy to update rules in one place and have changes propagate
4. **Discovery**: Helps players understand rule relationships
5. **Validation**: Tools help identify missing or inconsistent categorization

## Best Practices

1. **One Primary Source**: Each @RuleName should have one main %Source definition
2. **Descriptive Names**: Use clear, recognizable @RuleName patterns
3. **Comprehensive Coverage**: Add @RuleName tags for all major game concepts
4. **Regular Audits**: Use the categorization tools to maintain consistency
5. **Clear Documentation**: Keep this mapping documentation updated

This system transforms your static content into an interconnected, navigable rule reference that enhances the user experience and maintains consistency across your entire game website.
