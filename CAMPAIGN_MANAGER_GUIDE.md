# Campaign Manager - User Guide

## Overview

The Campaign Manager is a GM tool that allows you to manage multiple character sheets in one place, add GM notes, and prepare for combat sessions.

## Features

### 🎭 Character Management

-   **Add Characters**: Import .character.png files from the Digital Character Sheet
-   **View Stats**: See character stats at a glance (Body, Agility, Focus, Fate)
-   **Track Health**: Monitor current/max HP and equipment status
-   **Remove Characters**: Delete characters from the campaign with confirmation

### 📝 GM Notes

-   **Individual Notes**: Add private GM notes for each character
-   **Persistent Storage**: Notes are saved with the party file
-   **Combat Integration**: GM notes are included in combat files

### 💾 File Operations

#### Save Party (.party.png)

-   Creates a single file containing all character data + GM notes
-   Named format: `{party-name}.party.png`
-   Embeds data in PNG metadata (like character sheets)

#### Load Party

-   Load previously saved .party.png files
-   Restores all characters and GM notes
-   Supports drag & drop

#### Start Combat (.combat.png)

-   Creates a combat file for Initiative Tracker
-   Pre-populates with all party characters
-   Includes character data and GM notes
-   Named format: `{party-name}_combat.combat.png`

## Usage Workflow

### 1. Setup Campaign

1. Enter a party name
2. Add characters by:
    - Clicking "Add Character" and selecting .character.png files
    - Dragging & dropping character files onto the page

### 2. Manage Characters

-   View character stats summaries
-   Add GM notes for each character
-   Remove characters if needed

### 3. Save Progress

-   Click "Save Party" to create a .party.png file
-   This saves all characters and GM notes in one file

### 4. Start Combat

-   Click "Start Combat" to generate a .combat.png file
-   Load this file in Initiative Tracker for instant combat setup

## File Compatibility

### Supported Import Formats

-   `.character.png` - From Digital Character Sheet
-   `.party.png` - Previously saved party files
-   `.png` - Generic PNG files (checks for embedded data)

### Generated Files

-   `{party-name}.party.png` - Complete party save file
-   `{party-name}_combat.combat.png` - Combat-ready file for Initiative Tracker

## Tips

-   **Drag & Drop**: You can drag character or party files directly onto the page
-   **Character Count**: The header shows how many characters are in your party
-   **Button States**: Save and Start Combat buttons are disabled until you have content
-   **Automatic Naming**: Files are automatically named based on your party name
-   **Data Persistence**: All character data and GM notes are preserved in files

## Integration with Other Tools

### Digital Character Sheet

-   Import characters created in the Digital Character Sheet
-   All character data (stats, equipment, notes) is preserved

### Initiative Tracker

-   Combat files can be loaded directly into Initiative Tracker
-   Characters appear as "Player Character" combatants
-   GM notes are included in character notes field
-   HP values are automatically set from character data

## Data Storage

All data is stored using PNG metadata embedding:

-   **Character Files**: Individual character data in .character.png
-   **Party Files**: All party data (characters + GM notes) in .party.png
-   **Combat Files**: Combat-ready data in .combat.png

This allows for:

-   Cross-platform compatibility
-   No database requirements
-   Easy file sharing
-   Visual file identification (PNG thumbnails)
