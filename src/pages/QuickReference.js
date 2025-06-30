import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import {
    Container,
    Typography,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    Chip,
    Box,
    Divider,
} from "@mui/material"
import {
    Casino,
    Shield,
    LocalFireDepartment,
    Psychology,
} from "@mui/icons-material"
import HomeButton from "../components/HomeButton"
import useRulesEngine from "../hooks/useRulesEngine"
import { scrollToAnchor } from "../utils/scrollToAnchor"
import EnhancedKeywordLinker from "../components/RulesSearch/EnhancedKeywordLinker"

const QuickReference = () => {
    const { rulesData, loading } = useRulesEngine()
    const location = useLocation()

    // Handle scrolling to anchor sections
    useEffect(() => {
        if (!loading && rulesData.database?.quickReference && location.hash) {
            const timer = setTimeout(() => {
                const elementId = location.hash.substring(1)
                scrollToAnchor(elementId)
            }, 100)

            return () => clearTimeout(timer)
        }
    }, [loading, rulesData.database?.quickReference, location.hash])

    if (loading || !rulesData.database?.quickReference) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography variant='h4' align='center'>
                    Loading Quick Reference...
                </Typography>
            </Container>
        )
    }

    const { quickReference } = rulesData.database

    const getIcon = (category) => {
        switch (category) {
            case "core-mechanics":
                return <Casino />
            case "character-stats":
                return <Psychology />
            case "damage-types":
                return <LocalFireDepartment />
            default:
                return <Shield />
        }
    }

    const getCategoryTitle = (category) => {
        return category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    }

    return (
        <>
            <Container
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: "20px",
                    paddingBottom: "100px",
                    minHeight: "100vh",
                }}
            >
                <Typography
                    variant='h1'
                    gutterBottom
                    sx={{
                        textAlign: "center",
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                        mb: 4,
                    }}
                >
                    Quick Reference
                </Typography>

                <Grid container spacing={2}>
                    {Object.entries(quickReference).map(([category, items]) => (
                        <Grid item xs={12} md={4} key={category} id={category}>
                            <Paper
                                sx={{
                                    bgcolor: (theme) =>
                                        theme.palette.mode === "dark"
                                            ? "#1f1f1f"
                                            : "#f5f5f5",
                                    padding: "20px",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 2,
                                    }}
                                >
                                    {getIcon(category)}
                                    <Typography variant='h4' sx={{ ml: 1 }}>
                                        {getCategoryTitle(category)}
                                    </Typography>
                                </Box>

                                <List sx={{ flexGrow: 1 }}>
                                    {items.map((item, index) => (
                                        <ListItem key={index} sx={{ px: 0 }}>
                                            <ListItemText
                                                primary={
                                                    <Box>
                                                        <Typography
                                                            variant='subtitle1'
                                                            sx={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {item.term ||
                                                                item.stat ||
                                                                item.type}
                                                        </Typography>
                                                        {item.uses && (
                                                            <Box
                                                                sx={{ mt: 0.5 }}
                                                            >
                                                                {item.uses.map(
                                                                    (
                                                                        use,
                                                                        useIndex
                                                                    ) => (
                                                                        <Chip
                                                                            key={
                                                                                useIndex
                                                                            }
                                                                            label={
                                                                                <EnhancedKeywordLinker>
                                                                                    {
                                                                                        use
                                                                                    }
                                                                                </EnhancedKeywordLinker>
                                                                            }
                                                                            size='small'
                                                                            variant='outlined'
                                                                            sx={{
                                                                                mr: 0.5,
                                                                                mb: 0.5,
                                                                            }}
                                                                        />
                                                                    )
                                                                )}
                                                            </Box>
                                                        )}
                                                        {item.examples && (
                                                            <Box
                                                                sx={{ mt: 0.5 }}
                                                            >
                                                                <Typography
                                                                    variant='caption'
                                                                    color='text.secondary'
                                                                >
                                                                    Examples:{" "}
                                                                    {item.examples.join(
                                                                        ", "
                                                                    )}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        {item.effective_against && (
                                                            <Box
                                                                sx={{ mt: 0.5 }}
                                                            >
                                                                <Typography
                                                                    variant='caption'
                                                                    color='success.main'
                                                                >
                                                                    Effective
                                                                    against:{" "}
                                                                    {
                                                                        item.effective_against
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                }
                                                secondary={
                                                    <EnhancedKeywordLinker>
                                                        {item.description}
                                                    </EnhancedKeywordLinker>
                                                }
                                            />
                                            {index < items.length - 1 && (
                                                <Divider />
                                            )}
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Common Dice Roll Reference */}
                <Paper
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
                        padding: "20px",
                        mt: 3,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Casino />
                        <Typography variant='h4' sx={{ ml: 1 }}>
                            Common Dice Rolls
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: "center", p: 2 }}>
                                <Typography variant='h6' color='primary'>
                                    Success
                                </Typography>
                                <Typography variant='body2'>
                                    Roll ≤ Stat Value
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: "center", p: 2 }}>
                                <Typography variant='h6' color='success.main'>
                                    Critical Hit
                                </Typography>
                                <Typography variant='body2'>
                                    Natural 1 = 2 Damage
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: "center", p: 2 }}>
                                <Typography variant='h6' color='success.main'>
                                    Advantage
                                </Typography>
                                <Typography variant='body2'>
                                    Roll 2d10, choose lower
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: "center", p: 2 }}>
                                <Typography variant='h6' color='error.main'>
                                    Disadvantage
                                </Typography>
                                <Typography variant='body2'>
                                    Roll 2d10, choose higher
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

            <HomeButton />
        </>
    )
}

export default QuickReference
