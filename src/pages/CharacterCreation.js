import {
    Container,
    Typography,
    List,
    ListItem,
    Paper,
    CircularProgress,
    Alert,
    Grid,
    Box,
} from "@mui/material"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import HomeButton from "../components/HomeButton"
import useRulesEngine from "../hooks/useRulesEngine"
import EnhancedKeywordLinker from "../components/RulesSearch/EnhancedKeywordLinker"
import { scrollToAnchor } from "../utils/scrollToAnchor"

const CharacterCreation = () => {
    const { getCategoryRules, loading, error } = useRulesEngine()
    const [characterCreationData, setCharacterCreationData] = useState(null)
    const location = useLocation()

    useEffect(() => {
        if (!loading && !error) {
            const data = getCategoryRules("character-creation")
            setCharacterCreationData(data)
        }
    }, [loading, error, getCategoryRules])

    // Handle scrolling to anchor sections
    useEffect(() => {
        if (characterCreationData && location.hash) {
            const timer = setTimeout(() => {
                const elementId = location.hash.substring(1)
                scrollToAnchor(elementId)
            }, 100)

            return () => clearTimeout(timer)
        }
    }, [characterCreationData, location.hash])

    if (loading) {
        return (
            <Container
                sx={{ display: "flex", justifyContent: "center", py: 4 }}
            >
                <CircularProgress />
            </Container>
        )
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity='error'>
                    Error loading character creation rules: {error}
                </Alert>
            </Container>
        )
    }

    if (!characterCreationData) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity='warning'>
                    No character creation data found
                </Alert>
            </Container>
        )
    }

    const statsSection = characterCreationData.sections.find(
        (section) => section.id === "stats"
    )

    return (
        <>
            <Container
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: { xs: "15px", sm: "20px" },
                    display: "flex",
                    paddingBottom: { xs: "80px", sm: "100px" },
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
                        textShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "none"
                                : "0px 1px 2px rgba(0,0,0,0.1)",
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                        textAlign: "center",
                    }}
                >
                    {characterCreationData.title}
                </Typography>

                <Paper
                    id='stats'
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
                        padding: { xs: "15px", sm: "20px" },
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: { xs: "15px", sm: "20px" },
                        border: (theme) =>
                            theme.palette.mode === "dark"
                                ? "none"
                                : "1px solid #ccc",
                        boxShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "0 4px 8px rgba(0,0,0,0.5)"
                                : "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <Typography variant='h3' gutterBottom sx={{ mb: 3 }}>
                        {statsSection?.title}
                    </Typography>

                    <Grid container spacing={2}>
                        {statsSection?.content.map((stat, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Box
                                    sx={{
                                        p: 2,
                                        border: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "1px solid #444"
                                                : "1px solid #ddd",
                                        borderRadius: 2,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#2a2a2a"
                                                : "#ffffff",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant='h5'
                                        sx={{
                                            fontWeight: "bold",
                                            mb: 1,
                                            color: (theme) =>
                                                theme.palette.mode === "dark"
                                                    ? "#4fc3f7"
                                                    : "#1976d2",
                                        }}
                                    >
                                        {stat.name}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            flexGrow: 1,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        <EnhancedKeywordLinker
                                            referencesOnly={true}
                                        >
                                            {stat.description}
                                        </EnhancedKeywordLinker>
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                {/* Render all other sections dynamically */}
                {characterCreationData.sections
                    .filter((section) => section.id !== "stats")
                    .map((section) => (
                        <Paper
                            key={section.id}
                            id={section.id}
                            sx={{
                                bgcolor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "#1f1f1f"
                                        : "#f5f5f5",
                                color: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "#e0e0e0"
                                        : "#121212",
                                padding: "20px",
                                width: "100%",
                                maxWidth: "800px",
                                marginBottom: "20px",
                            }}
                        >
                            <Typography variant='h3' gutterBottom>
                                {section.title}
                            </Typography>

                            {section.description && (
                                <Typography variant='body1' paragraph>
                                    <EnhancedKeywordLinker
                                        referencesOnly={true}
                                    >
                                        {section.description}
                                    </EnhancedKeywordLinker>
                                </Typography>
                            )}

                            {section.subsections && (
                                <>
                                    {section.subsections.map((subsection) => (
                                        <div
                                            key={subsection.id}
                                            id={subsection.id}
                                            style={{ marginBottom: "20px" }}
                                        >
                                            <Typography
                                                variant='h4'
                                                gutterBottom
                                            >
                                                {subsection.title}
                                            </Typography>
                                            <Typography
                                                variant='body1'
                                                paragraph
                                            >
                                                <EnhancedKeywordLinker
                                                    referencesOnly={true}
                                                >
                                                    {subsection.description}
                                                </EnhancedKeywordLinker>
                                            </Typography>

                                            {subsection.options && (
                                                <List>
                                                    {subsection.options.map(
                                                        (option, optIndex) => (
                                                            <ListItem
                                                                key={optIndex}
                                                            >
                                                                <EnhancedKeywordLinker
                                                                    referencesOnly={
                                                                        true
                                                                    }
                                                                >
                                                                    {option}
                                                                </EnhancedKeywordLinker>
                                                            </ListItem>
                                                        )
                                                    )}
                                                </List>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </Paper>
                    ))}
            </Container>

            <HomeButton />
        </>
    )
}

export default CharacterCreation
