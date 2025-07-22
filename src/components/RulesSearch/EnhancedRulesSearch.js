import React, { useState, useEffect } from "react"
import {
    Box,
    TextField,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Chip,
    InputAdornment,
    IconButton,
    Collapse,
    Divider,
    Autocomplete,
    CircularProgress,
    Alert,
} from "@mui/material"
import {
    Search,
    Clear,
    ExpandMore,
    ExpandLess,
    MenuBook,
    Psychology,
    Shield,
    LocalFireDepartment,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import useRulesEngine from "../../hooks/useRulesEngine"

const EnhancedRulesSearch = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const navigate = useNavigate()

    const { rulesData, loading, error, search, getKeywordSuggestions } =
        useRulesEngine()

    // Perform search when query changes
    useEffect(() => {
        if (searchQuery.trim()) {
            const results = search(searchQuery)
            setSearchResults(results)
            setIsExpanded(true)
        } else {
            setSearchResults([])
            setIsExpanded(false)
        }
    }, [searchQuery, search])

    // Get suggestions for autocomplete
    useEffect(() => {
        if (searchQuery && searchQuery.length >= 2) {
            const newSuggestions = getKeywordSuggestions(searchQuery)
            setSuggestions(newSuggestions)
        } else {
            setSuggestions([])
        }
    }, [searchQuery, getKeywordSuggestions])

    const handleSearchChange = (event, newValue) => {
        setSearchQuery(newValue || event.target.value)
    }

    const clearSearch = () => {
        setSearchQuery("")
        setSearchResults([])
        setIsExpanded(false)
    }

    const handleResultClick = (result) => {
        navigate(result.path, {
            state: {
                searchTerm: searchQuery,
                highlightSection: result.section,
            },
        })
        setIsExpanded(false)
    }

    const getResultIcon = (type) => {
        switch (type) {
            case "combat-action":
            case "damage-type":
                return <Shield fontSize='small' />
            case "power":
                return <LocalFireDepartment fontSize='small' />
            case "rule-section":
            case "rule-subsection":
                return <MenuBook fontSize='small' />
            case "quick-reference":
                return <Psychology fontSize='small' />
            default:
                return <MenuBook fontSize='small' />
        }
    }

    const getResultTypeColor = (type) => {
        switch (type) {
            case "combat-action":
                return "error"
            case "damage-type":
                return "warning"
            case "power":
                return "secondary"
            case "equipment-rule":
                return "info"
            case "hunt-phase":
                return "success"
            case "quick-reference":
                return "primary"
            default:
                return "default"
        }
    }

    const formatResultType = (type) => {
        return type
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return (
            <Alert severity='error' sx={{ m: 2 }}>
                Error loading rules data: {error}
            </Alert>
        )
    }

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                margin: "0 auto",
            }}
        >
            <Autocomplete
                freeSolo
                options={suggestions}
                value={searchQuery}
                onInputChange={handleSearchChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        variant='outlined'
                        placeholder='Search rules, powers, equipment, monsters...'
                        sx={{
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#2d2d2d"
                                    : "#ffffff",
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: (theme) =>
                                        theme.palette.mode === "dark"
                                            ? "#555"
                                            : "#ccc",
                                },
                            },
                        }}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <Search />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    {searchQuery && (
                                        <IconButton
                                            onClick={clearSearch}
                                            edge='end'
                                            size='small'
                                        >
                                            <Clear />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() =>
                                            setIsExpanded(!isExpanded)
                                        }
                                        edge='end'
                                        size='small'
                                        sx={{ ml: 1 }}
                                    >
                                        {isExpanded ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />

            <Collapse in={isExpanded && searchResults.length > 0}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        maxHeight: "400px",
                        overflow: "auto",
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#ffffff",
                        border: (theme) =>
                            theme.palette.mode === "dark"
                                ? "1px solid #555"
                                : "1px solid #ccc",
                        mt: 1,
                    }}
                >
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                        }}
                    >
                        <Typography
                            variant='subtitle1'
                            sx={{ fontWeight: "bold" }}
                        >
                            {searchResults.length} result
                            {searchResults.length !== 1 ? "s" : ""} found
                        </Typography>
                    </Box>

                    <List sx={{ p: 0 }}>
                        {searchResults.map((result, index) => (
                            <React.Fragment
                                key={`${result.category}-${result.id || index}`}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() =>
                                            handleResultClick(result)
                                        }
                                        sx={{
                                            py: 1.5,
                                            px: 2,
                                            "&:hover": {
                                                bgcolor: (theme) =>
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "rgba(255,255,255,0.08)"
                                                        : "rgba(0,0,0,0.04)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                mr: 2,
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            {getResultIcon(result.type)}
                                        </Box>
                                        <ListItemText
                                            primary={
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant='subtitle1'
                                                        sx={{
                                                            fontWeight:
                                                                "medium",
                                                        }}
                                                    >
                                                        {result.title}
                                                    </Typography>
                                                    <Chip
                                                        label={formatResultType(
                                                            result.type
                                                        )}
                                                        size='small'
                                                        color={getResultTypeColor(
                                                            result.type
                                                        )}
                                                        variant='outlined'
                                                    />
                                                </Box>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography
                                                        variant='body2'
                                                        color='text.secondary'
                                                    >
                                                        {result.description
                                                            .length > 100
                                                            ? `${result.description.substring(
                                                                  0,
                                                                  100
                                                              )}...`
                                                            : result.description}
                                                    </Typography>
                                                    <Typography
                                                        variant='caption'
                                                        color='primary'
                                                    >
                                                        {
                                                            rulesData.database
                                                                ?.categories[
                                                                result.category
                                                            ]?.title
                                                        }
                                                    </Typography>
                                                    {result.examples &&
                                                        result.examples.length >
                                                            0 && (
                                                            <Typography
                                                                variant='caption'
                                                                display='block'
                                                                sx={{ mt: 0.5 }}
                                                            >
                                                                Examples:{" "}
                                                                {result.examples
                                                                    .slice(0, 3)
                                                                    .join(", ")}
                                                                {result.examples
                                                                    .length >
                                                                    3 && "..."}
                                                            </Typography>
                                                        )}
                                                </Box>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                                {index < searchResults.length - 1 && (
                                    <Divider />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Collapse>
        </Box>
    )
}

export default EnhancedRulesSearch
