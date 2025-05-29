import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import {
    Container,
    Typography,
    TextField,
    List,
    ListItem,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ReplayIcon from "@mui/icons-material/Replay"
import HomeButton from "../components/HomeButton"
import Section from "../components/Section"

const Spells = () => {
    // eslint-disable-next-line no-unused-vars
    const location = useLocation()
    const [spells, setSpells] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDecks, setSelectedDecks] = useState(["All"])
    const [selectedRarities, setSelectedRarities] = useState(["All"])
    const [availableDecks, setAvailableDecks] = useState(["All"])
    const [availableRarities, setAvailableRarities] = useState(["All"])

    // Expanded state for accordions (collapsed by default)
    const [deckAccordionExpanded, setDeckAccordionExpanded] = useState(false)
    const [rarityAccordionExpanded, setRarityAccordionExpanded] =
        useState(false)

    // On first mount, check if we should load from localStorage
    useEffect(() => {
        const savedSelections = localStorage.getItem("spellDeckSelections")
        const savedRarities = localStorage.getItem("spellRaritySelections")

        if (savedSelections) {
            try {
                const parsedSelections =
                    JSON.stringify(savedSelections) === JSON.stringify(["All"])
                        ? ["All"]
                        : JSON.parse(savedSelections)
                setSelectedDecks(parsedSelections)
            } catch (error) {
                console.error("Error parsing saved deck selections:", error)
            }
        }

        if (savedRarities) {
            try {
                const parsedRarities =
                    JSON.stringify(savedRarities) === JSON.stringify(["All"])
                        ? ["All"]
                        : JSON.parse(savedRarities)
                setSelectedRarities(parsedRarities)
            } catch (error) {
                console.error("Error parsing saved rarity selections:", error)
            }
        }
    }, [])

    // Save selections to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(
            "spellDeckSelections",
            JSON.stringify(selectedDecks)
        )
        localStorage.setItem(
            "spellRaritySelections",
            JSON.stringify(selectedRarities)
        )
    }, [selectedDecks, selectedRarities])

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const response = await fetch("/spells.json")
                const data = await response.json()
                setSpells(data.spells)

                // Extract unique deck and rarity names
                const decks = [
                    "All",
                    ...new Set(
                        data.spells.map((spell) => spell.deck || "Unknown")
                    ),
                ]
                setAvailableDecks(decks)

                const rarities = [
                    "All",
                    ...new Set(
                        data.spells.map((spell) => spell.rarity || "Unknown")
                    ),
                ]
                setAvailableRarities(rarities)
            } catch (error) {
                console.error("Error fetching spells data:", error)
            }
        }

        fetchSpells()
    }, [])

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const clearSearchQuery = () => {
        setSearchQuery("")
    }

    const handleDeckToggle = (deck) => {
        setSelectedDecks((prevSelectedDecks) => {
            // If "All" is clicked
            if (deck === "All") {
                // If "All" is already selected, don't change anything
                if (prevSelectedDecks.includes("All")) {
                    return prevSelectedDecks
                }
                // Otherwise, select only "All"
                return ["All"]
            }

            // Create a new array for the updated selection
            let newSelectedDecks

            // If the deck is already selected, remove it
            if (prevSelectedDecks.includes(deck)) {
                newSelectedDecks = prevSelectedDecks.filter((d) => d !== deck)
                // If removing the last deck, select "All" again
                if (newSelectedDecks.length === 0) {
                    return ["All"]
                }
                // If "All" was previously selected, remove it
                return newSelectedDecks.filter((d) => d !== "All")
            }
            // If the deck is not selected, add it
            else {
                // If already selected decks includes "All", remove "All" and add the new deck
                if (prevSelectedDecks.includes("All")) {
                    return [deck]
                }
                // Otherwise add the new deck to the existing selections
                return [...prevSelectedDecks, deck]
            }
        })
    }

    const handleRarityToggle = (rarity) => {
        setSelectedRarities((prevSelectedRarities) => {
            // If "All" is clicked
            if (rarity === "All") {
                // If "All" is already selected, don't change anything
                if (prevSelectedRarities.includes("All")) {
                    return prevSelectedRarities
                }
                // Otherwise, select only "All"
                return ["All"]
            }

            // Create a new array for the updated selection
            let newSelectedRarities

            // If the rarity is already selected, remove it
            if (prevSelectedRarities.includes(rarity)) {
                newSelectedRarities = prevSelectedRarities.filter(
                    (r) => r !== rarity
                )
                // If removing the last rarity, select "All" again
                if (newSelectedRarities.length === 0) {
                    return ["All"]
                }
                // If "All" was previously selected, remove it
                return newSelectedRarities.filter((r) => r !== "All")
            }
            // If the rarity is not selected, add it
            else {
                // If already selected rarities includes "All", remove "All" and add the new rarity
                if (prevSelectedRarities.includes("All")) {
                    return [rarity]
                }
                // Otherwise add the new rarity to the existing selections
                return [...prevSelectedRarities, rarity]
            }
        })
    }

    // Reset filters functions
    const resetDeckFilters = () => {
        setSelectedDecks(["All"])
    }

    const resetRarityFilters = () => {
        setSelectedRarities(["All"])
    }

    // Handle accordion expansion toggling
    const handleDeckAccordionChange = (event, isExpanded) => {
        setDeckAccordionExpanded(isExpanded)
    }

    const handleRarityAccordionChange = (event, isExpanded) => {
        setRarityAccordionExpanded(isExpanded)
    }

    const filteredSpells = spells
        .filter(
            (spell) =>
                spell.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (selectedDecks.includes("All") ||
                    selectedDecks.includes(spell.deck)) &&
                (selectedRarities.includes("All") ||
                    selectedRarities.includes(spell.rarity))
        )
        .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name

    return (
        <>
            <Container
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: { xs: "15px", sm: "20px" },
                    paddingBottom: { xs: "80px", sm: "100px" }, // Adjust this value as needed
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Typography
                    variant='h1'
                    gutterBottom
                    sx={{
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#e0e0e0"
                                : "#121212",
                    }}
                >
                    Spells
                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                        backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
                        borderRadius: "4px",
                        padding: "16px",
                        position: "relative",
                        boxShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "0 2px 8px rgba(0,0,0,0.2)"
                                : "0 2px 8px rgba(0,0,0,0.1)",
                        border: (theme) =>
                            theme.palette.mode === "dark"
                                ? "none"
                                : "1px solid #ccc",
                    }}
                >
                    {/* Filter menu header */}
                    <Typography
                        variant='h6'
                        sx={{
                            mb: 2,
                            pb: 1,
                            borderBottom: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "1px solid #333"
                                    : "1px solid #ccc",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#e0e0e0"
                                    : "#121212",
                        }}
                    >
                        <span
                            role='img'
                            aria-label='filter'
                            style={{ fontSize: "0.9em" }}
                        >
                            🔍
                        </span>
                        Filter & Search
                    </Typography>

                    {/* Filter menu layout with search box */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                        }}
                    >
                        {/* Left side - Filters */}
                        <Box
                            sx={{
                                flex: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            {/* Deck Filters - Accordion */}
                            <Accordion
                                expanded={deckAccordionExpanded}
                                onChange={handleDeckAccordionChange}
                                sx={{
                                    bgcolor: "#252525",
                                    color: "#e0e0e0",
                                    boxShadow: "none",
                                    border: "1px solid #333",
                                    "&:before": {
                                        display: "none", // Removes the default divider
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreIcon
                                            sx={{ color: "#e0e0e0" }}
                                        />
                                    }
                                    aria-controls='deck-filters-content'
                                    id='deck-filters-header'
                                    sx={{
                                        borderBottom: deckAccordionExpanded
                                            ? "1px solid #333"
                                            : "none",
                                        minHeight: "48px",
                                        "&.Mui-expanded": {
                                            minHeight: "48px",
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            flexShrink: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        Deck Filters
                                        <Box
                                            component='span'
                                            sx={{
                                                ml: 1,
                                                fontSize: "0.75rem",
                                                bgcolor: (theme) =>
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "#333"
                                                        : "#666",
                                                color: (theme) =>
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "#e0e0e0"
                                                        : "#ffffff",
                                                py: 0.5,
                                                px: 1,
                                                borderRadius: "10px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                height: "20px",
                                            }}
                                        >
                                            {selectedDecks.includes("All")
                                                ? "All"
                                                : `${selectedDecks.length} selected`}
                                        </Box>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ pt: 2, pb: 1 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            variant='body2'
                                            sx={{ color: "#999" }}
                                        >
                                            Select decks to filter:
                                        </Typography>
                                        <Button
                                            startIcon={<ReplayIcon />}
                                            size='small'
                                            onClick={resetDeckFilters}
                                            sx={{
                                                color: "#999",
                                                "&:hover": {
                                                    color: "#e0e0e0",
                                                    bgcolor:
                                                        "rgba(255,255,255,0.05)",
                                                },
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    </Box>
                                    <FormGroup sx={{ ml: 1 }}>
                                        {availableDecks.map((deck) => (
                                            <FormControlLabel
                                                key={deck}
                                                control={
                                                    <Checkbox
                                                        checked={selectedDecks.includes(
                                                            deck
                                                        )}
                                                        onChange={() =>
                                                            handleDeckToggle(
                                                                deck
                                                            )
                                                        }
                                                        sx={{
                                                            color: "#777",
                                                            "&.Mui-checked": {
                                                                color: "#90caf9",
                                                            },
                                                        }}
                                                        size='small'
                                                    />
                                                }
                                                label={
                                                    <Typography
                                                        variant='body2'
                                                        sx={{
                                                            color: "#e0e0e0",
                                                        }}
                                                    >
                                                        {deck}
                                                    </Typography>
                                                }
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>

                            {/* Rarity Filters - Accordion */}
                            <Accordion
                                expanded={rarityAccordionExpanded}
                                onChange={handleRarityAccordionChange}
                                sx={{
                                    bgcolor: "#252525",
                                    color: "#e0e0e0",
                                    boxShadow: "none",
                                    border: "1px solid #333",
                                    "&:before": {
                                        display: "none", // Removes the default divider
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreIcon
                                            sx={{ color: "#e0e0e0" }}
                                        />
                                    }
                                    aria-controls='rarity-filters-content'
                                    id='rarity-filters-header'
                                    sx={{
                                        borderBottom: rarityAccordionExpanded
                                            ? "1px solid #333"
                                            : "none",
                                        minHeight: "48px",
                                        "&.Mui-expanded": {
                                            minHeight: "48px",
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            flexShrink: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        Rarity Filters
                                        <Box
                                            component='span'
                                            sx={{
                                                ml: 1,
                                                fontSize: "0.75rem",
                                                bgcolor: (theme) =>
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "#333"
                                                        : "#666",
                                                color: (theme) =>
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "#e0e0e0"
                                                        : "#ffffff",
                                                py: 0.5,
                                                px: 1,
                                                borderRadius: "10px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                height: "20px",
                                            }}
                                        >
                                            {selectedRarities.includes("All")
                                                ? "All"
                                                : `${selectedRarities.length} selected`}
                                        </Box>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ pt: 2, pb: 1 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            variant='body2'
                                            sx={{ color: "#999" }}
                                        >
                                            Select rarities to filter:
                                        </Typography>
                                        <Button
                                            startIcon={<ReplayIcon />}
                                            size='small'
                                            onClick={resetRarityFilters}
                                            sx={{
                                                color: "#999",
                                                "&:hover": {
                                                    color: "#e0e0e0",
                                                    bgcolor:
                                                        "rgba(255,255,255,0.05)",
                                                },
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    </Box>
                                    <FormGroup sx={{ ml: 1 }}>
                                        {availableRarities.map((rarity) => (
                                            <FormControlLabel
                                                key={rarity}
                                                control={
                                                    <Checkbox
                                                        checked={selectedRarities.includes(
                                                            rarity
                                                        )}
                                                        onChange={() =>
                                                            handleRarityToggle(
                                                                rarity
                                                            )
                                                        }
                                                        sx={{
                                                            color: "#777",
                                                            "&.Mui-checked": {
                                                                color: "#90caf9",
                                                            },
                                                        }}
                                                        size='small'
                                                    />
                                                }
                                                label={
                                                    <Typography
                                                        variant='body2'
                                                        sx={{
                                                            color: "#e0e0e0",
                                                        }}
                                                    >
                                                        {rarity}
                                                    </Typography>
                                                }
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </Box>

                        {/* Right side - Search */}
                        <Box
                            sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "stretch",
                                mt: { xs: 2, md: 0 },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <Typography
                                    variant='body2'
                                    sx={{ color: "#999" }}
                                >
                                    Search spells:
                                </Typography>
                                {searchQuery && (
                                    <Button
                                        size='small'
                                        onClick={clearSearchQuery}
                                        sx={{
                                            color: "#999",
                                            "&:hover": {
                                                color: "#e0e0e0",
                                                bgcolor:
                                                    "rgba(255,255,255,0.05)",
                                            },
                                        }}
                                    >
                                        Clear
                                    </Button>
                                )}
                            </Box>
                            <TextField
                                variant='outlined'
                                placeholder='Enter spell name...'
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                sx={{
                                    bgcolor: "#252525",
                                    borderRadius: "4px",
                                    width: "100%",
                                    input: {
                                        color: "#e0e0e0",
                                    },
                                    fieldset: {
                                        borderColor: "#444",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#666 !important",
                                    },
                                    flex: 1,
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Results count */}
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "800px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                        px: 1,
                    }}
                >
                    <Typography variant='body2' sx={{ color: "#999" }}>
                        <strong>{filteredSpells.length}</strong> spell
                        {filteredSpells.length !== 1 ? "s" : ""} found
                    </Typography>
                </Box>

                <List
                    sx={{
                        width: "100%",
                        maxWidth: "800px",
                        bgcolor: "#1f1f1f",
                        borderRadius: "4px",
                        padding: "10px",
                    }}
                >
                    {filteredSpells.map((spell, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                borderBottom: "1px solid #333",
                                padding: "10px",
                                "&:last-child": {
                                    borderBottom: "none",
                                },
                            }}
                        >
                            <Section
                                sx={{
                                    width: "100%",
                                    padding: "20px",
                                }}
                            >
                                <Typography variant='h2' gutterBottom>
                                    {spell.name}
                                </Typography>
                                <Typography variant='body1' paragraph>
                                    <strong>Rarity:</strong> {spell.rarity}
                                </Typography>
                                <Typography variant='body1' paragraph>
                                    <strong>Deck:</strong>{" "}
                                    {spell.deck || "Unknown"}
                                </Typography>
                                <Typography variant='body1' paragraph>
                                    {spell.description}
                                </Typography>
                            </Section>
                        </ListItem>
                    ))}
                </List>
            </Container>

            <HomeButton />
        </>
    )
}

export default Spells
