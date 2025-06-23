import React, { useState, useEffect, useMemo } from "react"
import {
    Tooltip,
    Typography,
    Box,
    Paper,
    Chip,
    IconButton,
} from "@mui/material"
import { OpenInNew } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const KeywordLinker = ({ children, disabled = false }) => {
    const [allContent, setAllContent] = useState([])
    const navigate = useNavigate()

    // Define keyword mappings to rules
    const keywordMappings = useMemo(
        () => ({
            // Stats
            body: {
                page: "Character Creation",
                path: "/character-creation",
                section: "Stats",
                description:
                    "Physical strength, lifting, pushing, climbing, dragging, grappling",
            },
            agility: {
                page: "Character Creation",
                path: "/character-creation",
                section: "Stats",
                description:
                    "Speed, jumping, swimming, catching, squeezing, picking locks, escaping",
            },
            focus: {
                page: "Character Creation",
                path: "/character-creation",
                section: "Stats",
                description:
                    "Mental concentration, perceiving, listening, conjuring magic, tracking",
            },
            fate: {
                page: "Character Creation",
                path: "/character-creation",
                section: "Stats",
                description:
                    "Life force, fortune, controlling will, resisting enchantment, luck",
            },
            insight: {
                page: "Progression",
                path: "/progression",
                section: "Insight",
                description:
                    "Allows rerolls and seeing hidden creatures, lights, objects. Learn about cosmos and threats to mankind.",
            },

            // Combat Actions
            attack: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Attack",
                description:
                    "Roll 1d10 against Attack Stat. If lower, deal 1 damage (2 for natural 1)",
            },
            dodge: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Dodge",
                description:
                    "Roll 1d10 against Agility. If lower, immune to dodgeable attacks and regain 1 HP",
            },
            brace: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Brace",
                description:
                    "Roll 1d10 against Body. If lower with equipment, immune to braceable attacks and regain 1 HP",
            },
            "gather a spell": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Gather a Spell",
                description:
                    "Roll 1d10 against Focus. If lower, draw 1 spell from your spell deck",
            },
            flee: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Flee",
                description:
                    "Roll 1d10 against Agility. If lower, successfully exit combat",
            },
            negotiate: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Negotiate",
                description:
                    "Roll 1d10 against Focus. If lower, attempt to negotiate with monsters",
            },

            // Combat Mechanics Terms
            "attack stat": {
                page: "Character Creation",
                path: "/character-creation",
                section: "Attack Stat and Hit Points",
                description:
                    "Choose Body, Agility, or Focus as your attack stat for combat rolls",
            },
            "hit points": {
                page: "Character Creation",
                path: "/character-creation",
                section: "Attack Stat and Hit Points",
                description:
                    "Half of Fate (rounded up) determines your hit points",
            },
            crit: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Attack",
                description:
                    "Rolling a natural 1 on attack deals 2 damage instead of 1",
            },
            "crit fail": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Dodge",
                description:
                    "Rolling a 10 triggers monster's critical failure effect when successfully attacked",
            },

            // Damage Types
            "physical damage": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Physical Damage",
                description:
                    "Standard damage from conventional weapons like swords, guns, clubs",
            },
            "spiritual damage": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Spiritual Damage",
                description:
                    "Damage that affects the soul or essence. Effective against undead and supernatural entities",
            },
            "hybrid damage": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Hybrid Damage",
                description:
                    "Combines physical and spiritual elements. Effective against both corporeal and incorporeal beings",
            },

            // Equipment and Weapons
            weapons: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Weapons",
                description:
                    "Two-weapons, polearms, ranged weapons, and special weapons let you roll 2d10s when attacking",
            },
            "two-weapons": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Weapons",
                description:
                    "Dual-wielded weapons that allow rolling 2d10s when attacking, choosing the lower",
            },
            polearms: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Weapons",
                description:
                    "Long-reach weapons that allow rolling 2d10s when attacking, choosing the lower",
            },
            "ranged weapons": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Weapons",
                description:
                    "Projectile weapons that allow rolling 2d10s when attacking, choosing the lower",
            },
            shield: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Shield",
                description:
                    "Roll an additional d10 when bracing, choose the lower",
            },
            armor: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Armor",
                description:
                    "Roll an additional d10 when bracing, choose the lower",
            },
            "no armor": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "No Armor",
                description: "Roll 2d10s when dodging, choose the lower",
            },

            // Status Effects
            frightened: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Statuses",
                description:
                    "Cannot attack or willingly move towards the source of fear",
            },
            unconscious: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Statuses",
                description:
                    "Cannot defend, attack, or move. Attacks automatically succeed against unconscious creatures",
            },

            // Death and Recovery
            "grit teeth": {
                page: "Death and Resting",
                path: "/death-and-resting",
                section: "Grit Teeth",
                description:
                    "Once per night's rest, regain 1 hit point during 1-minute respite from combat",
            },
            "night's rest": {
                page: "Death and Resting",
                path: "/death-and-resting",
                section: "Night's Rest",
                description:
                    "Full recovery: restore all hit points, regain spells, recharge abilities, gain insight rerolls",
            },
            death: {
                page: "Death and Resting",
                path: "/death-and-resting",
                section: "Death",
                description:
                    "When you reach 0 hit points, test Fate. On success, live with 1 hit point",
            },

            // Progression
            "leveling up": {
                page: "Progression",
                path: "/progression",
                section: "Leveling Up",
                description:
                    "After surviving a Fight and resting, roll 1d10 against chosen stat to increase it",
            },
            ascendant: {
                page: "Progression",
                path: "/progression",
                section: "Ascendant",
                description:
                    "Hunter with 10 Insight can meet Old Man/Ancient Mistress and make a wish",
            },

            // Spellcasting
            spellcasting: {
                page: "Spellcasting",
                path: "/spellcasting",
                section: "Gathering Spells",
                description:
                    "Test Focus to gather spell from deck. Hold up to 3 spells at a time",
            },
            "gathering spells": {
                page: "Spellcasting",
                path: "/spellcasting",
                section: "Gathering Spells",
                description:
                    "Test Focus to gather spell from deck. Hold up to 3 spells at a time",
            },
            "casting spells": {
                page: "Spellcasting",
                path: "/spellcasting",
                section: "Casting Spells",
                description:
                    "Cast gathered spell following description. Discard after use unless specified",
            },
            "spell deck": {
                page: "Spellcasting",
                path: "/spellcasting",
                section: "Gathering Spells",
                description:
                    "Collection of spell cards organized by deck type and rarity",
            },

            // Game Running
            "hidden creatures": {
                page: "Running the Game",
                path: "/running-the-game",
                section: "Hidden Creatures",
                description:
                    "Monsters have Insight requirements before hunters can see them as they truly are",
            },
            "monster tables": {
                page: "Running the Game",
                path: "/running-the-game",
                section: "Monster Tables",
                description:
                    "Actions determined by rolling d10: Attack, Special Ability, Defend, Move",
            },
            "hunt outline": {
                page: "Running the Game",
                path: "/running-the-game",
                section: "Hunt Outline",
                description:
                    "Hook, Negotiate Pay, Rumor Phase, Research Phase, Prepare, Tracking, Fight, Denouement",
            },
            "rumor phase": {
                page: "Running the Game",
                path: "/running-the-game",
                section: "Rumor Phase",
                description:
                    "Meet someone who provides rumors about the monster (true and misleading information)",
            },
            "research phase": {
                page: "Running the Game",
                path: "/running-the-game",
                section: "Research Phase",
                description:
                    "Use old sources to learn monster's weakness by testing Fate",
            },

            // Character Creation
            "stat arrays": {
                page: "Character Creation",
                path: "/character-creation",
                section: "Standard Stat Arrays",
                description:
                    "Choose from predefined arrays: 6,6,6,6 or 4,4,8,8 or 3,4,8,9",
            },
            "rolling stats": {
                page: "Character Creation",
                path: "/character-creation",
                section: "Rolling Stats",
                description:
                    "Roll 4d10s and assign values to Body, Agility, Focus, Fate (max 10, min 2)",
            },
            "random start": {
                page: "Character Creation",
                path: "/character-creation",
                section: "Random Start",
                description:
                    "Draw 10 equipment cards from Starter Deck per player, each chooses up to 10",
            },
            "fixed start": {
                page: "Character Creation",
                path: "/character-creation",
                section: "Fixed Start",
                description:
                    "Choose 10 cards from your character deck to outfit your hunter",
            },

            // Equipment terms
            incorporeal: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Spiritual Damage",
                description:
                    "Beings that cannot be harmed by physical attacks, requiring spiritual or hybrid damage",
            },
            corporeal: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Hybrid Damage",
                description:
                    "Physical beings that can be harmed by normal weapons and attacks",
            },
            undead: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Spiritual Damage",
                description:
                    "Supernatural creatures particularly vulnerable to spiritual damage",
            },
            demons: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Spiritual Damage",
                description:
                    "Supernatural entities particularly vulnerable to spiritual damage",
            },

            // Prayer and ritual terms
            prayers: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Spiritual Damage",
                description:
                    "Divine invocations that deal spiritual damage to supernatural entities",
            },
            "holy water": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Spiritual Damage",
                description:
                    "Blessed water that deals spiritual damage to supernatural entities",
            },
            "consecrated rituals": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Spiritual Damage",
                description:
                    "Sacred ceremonies that deal spiritual damage to supernatural entities",
            },
            "divine magic": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Spiritual Damage",
                description:
                    "Sacred spells that deal spiritual damage to supernatural entities",
            },
            exorcism: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Spiritual Damage",
                description:
                    "Ritual to banish supernatural entities using spiritual damage",
            },
            curses: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Spiritual Damage",
                description:
                    "Dark magic that deals spiritual damage to targets",
            },

            // Equipment specific terms
            "silver weapons": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Hybrid Damage",
                description:
                    "Blessed or alchemically treated weapons that deal hybrid damage",
            },
            fire: {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Hybrid Damage",
                description:
                    "Elemental force that deals hybrid damage to most creatures",
            },
            "elemental attacks": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Hybrid Damage",
                description: "Magical forces of nature that deal hybrid damage",
            },
            "enchanted weapons": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Hybrid Damage",
                description:
                    "Magically enhanced weapons that deal hybrid damage",
            },
            "alchemical compounds": {
                page: "Combat Mechanics",
                path: "/combat-mechanics",
                section: "Hybrid Damage",
                description:
                    "Chemically prepared substances that deal hybrid damage",
            },
        }),
        []
    )

    // Load dynamic content for spell/equipment/monster references
    useEffect(() => {
        const loadDynamicContent = async () => {
            try {
                const [spellsResponse, equipmentResponse, monstersResponse] =
                    await Promise.all([
                        fetch("/spells.json"),
                        fetch("/equipment.json"),
                        fetch("/monsters.json"),
                    ])

                const spellsData = await spellsResponse.json()
                const equipmentData = await equipmentResponse.json()
                const monstersData = await monstersResponse.json()

                setAllContent({
                    spells: spellsData.spells || [],
                    equipment: equipmentData.equipment || [],
                    monsters: monstersData || [],
                })
            } catch (error) {
                console.error("Error loading dynamic content:", error)
            }
        }

        loadDynamicContent()
    }, [])

    // Create enhanced keyword mappings with dynamic content
    const enhancedKeywordMappings = useMemo(() => {
        const enhanced = { ...keywordMappings }

        // Add spell names
        allContent.spells?.forEach((spell) => {
            enhanced[spell.name.toLowerCase()] = {
                page: "Spells",
                path: "/spells",
                section: spell.name,
                description: `${spell.deck} spell - ${spell.description}`,
                type: "spell",
            }
        })

        // Add equipment names
        allContent.equipment?.forEach((item) => {
            enhanced[item.name.toLowerCase()] = {
                page: "Equipment",
                path: "/equipment",
                section: item.name,
                description: item.description,
                type: "equipment",
            }
        })

        // Add monster names
        allContent.monsters?.forEach((monster) => {
            enhanced[monster.Name.toLowerCase()] = {
                page: "Monsters",
                path: `/monsters/${monster.Name}`,
                section: monster.Name,
                description: monster.Description,
                type: "monster",
            }
        })

        return enhanced
    }, [keywordMappings, allContent])

    // Function to process text and add keyword links
    const processText = (text) => {
        if (disabled || typeof text !== "string") {
            return text
        }

        const words = text.split(/(\s+|[.,!?;:()[\]{}"])/g)
        const processed = []

        for (let i = 0; i < words.length; i++) {
            const word = words[i]
            const cleanWord = word.toLowerCase().replace(/[.,!?;:()[\]{}"]/, "")

            // Check for multi-word phrases first
            let matched = false
            const maxPhraseLength = 4 // Increased to handle "Gather a Spell"

            for (
                let phraseLength = maxPhraseLength;
                phraseLength >= 1;
                phraseLength--
            ) {
                // Calculate how many array elements we need (words + spaces)
                const arrayLength = phraseLength * 2 - 1
                if (i + arrayLength <= words.length) {
                    // Extract the phrase by taking every other element (skipping spaces)
                    const phraseWords = []
                    for (let j = 0; j < arrayLength; j += 2) {
                        if (i + j < words.length) {
                            phraseWords.push(words[i + j])
                        }
                    }

                    const phrase = phraseWords
                        .join(" ")
                        .toLowerCase()
                        .replace(/[.,!?;:()[\]{}"]/, "")

                    if (enhancedKeywordMappings[phrase]) {
                        const rule = enhancedKeywordMappings[phrase]
                        // Get the original text including spaces and punctuation
                        const originalText = words
                            .slice(i, i + arrayLength)
                            .join("")

                        processed.push(
                            <KeywordTooltip
                                key={`${i}-${phrase}`}
                                rule={rule}
                                onNavigate={() => navigate(rule.path)}
                            >
                                {originalText}
                            </KeywordTooltip>
                        )
                        i += arrayLength - 1 // Skip processed words
                        matched = true
                        break
                    }
                }
            }

            // If no phrase matched, check single word
            if (!matched) {
                if (enhancedKeywordMappings[cleanWord]) {
                    const rule = enhancedKeywordMappings[cleanWord]
                    processed.push(
                        <KeywordTooltip
                            key={`${i}-${cleanWord}`}
                            rule={rule}
                            onNavigate={() => navigate(rule.path)}
                        >
                            {word}
                        </KeywordTooltip>
                    )
                } else {
                    processed.push(word)
                }
            }
        }

        return processed
    }

    // Process children recursively
    const processChildren = (children) => {
        if (typeof children === "string") {
            return processText(children)
        }

        if (React.isValidElement(children)) {
            return React.cloneElement(children, {
                children: processChildren(children.props.children),
            })
        }

        if (Array.isArray(children)) {
            return children.map((child, index) => (
                <React.Fragment key={index}>
                    {processChildren(child)}
                </React.Fragment>
            ))
        }

        return children
    }

    return <>{processChildren(children)}</>
}

// Tooltip component for displaying rule information
const KeywordTooltip = ({ children, rule, onNavigate }) => {
    const getChipColor = (type) => {
        switch (type) {
            case "spell":
                return "secondary"
            case "equipment":
                return "primary"
            case "monster":
                return "error"
            default:
                return "default"
        }
    }

    const tooltipContent = (
        <Paper
            sx={{
                p: 2,
                maxWidth: 300,
                backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1f1f1f" : "#ffffff",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Typography variant='subtitle2' component='div'>
                    {rule.section}
                </Typography>
                {rule.type && (
                    <Chip
                        label={rule.type}
                        size='small'
                        color={getChipColor(rule.type)}
                        sx={{ fontSize: "0.7rem", height: "18px" }}
                    />
                )}
                <IconButton
                    size='small'
                    onClick={onNavigate}
                    sx={{ ml: "auto", color: "primary.main" }}
                >
                    <OpenInNew fontSize='small' />
                </IconButton>
            </Box>

            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                {rule.description}
            </Typography>

            <Typography
                variant='caption'
                color='primary'
                sx={{ fontStyle: "italic" }}
            >
                from {rule.page}
            </Typography>
        </Paper>
    )

    return (
        <Tooltip
            title={tooltipContent}
            placement='top'
            arrow
            enterDelay={300}
            leaveDelay={200}
        >
            <Typography
                component='span'
                sx={{
                    color: "primary.main",
                    textDecoration: "underline",
                    textDecorationStyle: "dotted",
                    cursor: "pointer",
                    "&:hover": {
                        backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "rgba(144, 202, 249, 0.1)"
                                : "rgba(25, 118, 210, 0.1)",
                    },
                }}
            >
                {children}
            </Typography>
        </Tooltip>
    )
}

export default KeywordLinker
