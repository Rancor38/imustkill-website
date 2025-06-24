import {
    Container,
    Typography,
    List,
    ListItem,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material"
import { useState, useEffect } from "react"
import HomeButton from "../components/HomeButton"
import useRulesEngine from "../hooks/useRulesEngine"
import KeywordLinker from "../components/RulesSearch/EnhancedKeywordLinker"

const CharacterCreation = () => {
    const { getCategoryRules, loading, error } = useRulesEngine()
    const [characterCreationData, setCharacterCreationData] = useState(null)

    useEffect(() => {
        if (!loading && !error) {
            const data = getCategoryRules("character-creation")
            setCharacterCreationData(data)
        }
    }, [loading, error, getCategoryRules])

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
                    <Typography variant='h3' gutterBottom>
                        {statsSection?.title}:
                    </Typography>
                    <List>
                        {statsSection?.content.map((stat, index) => (
                            <ListItem key={index}>
                                <KeywordLinker>
                                    <strong>{stat.name}</strong> (
                                    {stat.description})
                                </KeywordLinker>
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                {/* Render all other sections dynamically */}
                {characterCreationData.sections
                    .filter((section) => section.id !== "stats")
                    .map((section) => (
                        <Paper
                            key={section.id}
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
                                    <KeywordLinker>
                                        {section.description}
                                    </KeywordLinker>
                                </Typography>
                            )}

                            {section.subsections && (
                                <>
                                    {section.subsections.map((subsection) => (
                                        <div
                                            key={subsection.id}
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
                                                <KeywordLinker>
                                                    {subsection.description}
                                                </KeywordLinker>
                                            </Typography>

                                            {subsection.options && (
                                                <List>
                                                    {subsection.options.map(
                                                        (option, optIndex) => (
                                                            <ListItem
                                                                key={optIndex}
                                                            >
                                                                <KeywordLinker>
                                                                    {option}
                                                                </KeywordLinker>
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
