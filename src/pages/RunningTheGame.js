import {
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    CircularProgress,
    Alert,
} from "@mui/material"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import HomeButton from "../components/HomeButton"
import useRulesEngine from "../hooks/useRulesEngine"
import EnhancedKeywordLinker from "../components/RulesSearch/EnhancedKeywordLinker"
import { scrollToAnchor } from "../utils/scrollToAnchor"

const RunningTheGame = () => {
    const { getCategoryRules, loading, error } = useRulesEngine()
    const [runningGameData, setRunningGameData] = useState(null)
    const location = useLocation()

    useEffect(() => {
        if (!loading && !error) {
            const data = getCategoryRules("running-the-game")
            setRunningGameData(data)
        }
    }, [loading, error, getCategoryRules])

    // Handle scrolling to anchor sections
    useEffect(() => {
        if (runningGameData && location.hash) {
            const timer = setTimeout(() => {
                const elementId = location.hash.substring(1)
                scrollToAnchor(elementId)
            }, 100)

            return () => clearTimeout(timer)
        }
    }, [runningGameData, location.hash])

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
                    Error loading running the game rules: {error}
                </Alert>
            </Container>
        )
    }

    if (!runningGameData) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity='warning'>No running the game data found</Alert>
            </Container>
        )
    }
    return (
        <>
            <Container
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: "20px",
                    paddingBottom: "100px",
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
                    {runningGameData.title}
                </Typography>

                {/* Render all sections dynamically */}
                {runningGameData.sections.map((section) => (
                    <Paper
                        key={section.id}
                        id={section.id} // anchor link id
                        sx={{
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#1f1f1f"
                                    : "#f5f5f5",
                            border: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "none"
                                    : "1px solid #ccc",
                            padding: "20px",
                            width: "100%",
                            maxWidth: "800px",
                            marginBottom: "20px",
                        }}
                    >
                        <Typography variant='h3' gutterBottom>
                            {section.title}
                        </Typography>

                        {/* Hunt phases */}
                        {section.phases && (
                            <>
                                {section.phases.map((phase, index) => (
                                    <Paper
                                        key={phase.name}
                                        sx={{
                                            bgcolor: (theme) =>
                                                theme.palette.mode === "dark"
                                                    ? "#2a2a2a"
                                                    : "#ffffff",
                                            padding: "15px",
                                            margin: "15px 0",
                                            border: (theme) =>
                                                theme.palette.mode === "dark"
                                                    ? "1px solid #444"
                                                    : "1px solid #ddd",
                                        }}
                                    >
                                        <Typography variant='h4' gutterBottom>
                                            {index + 1}. {phase.name}
                                        </Typography>
                                        <Typography variant='body1' paragraph>
                                            <EnhancedKeywordLinker>
                                                {phase.description}
                                            </EnhancedKeywordLinker>
                                        </Typography>
                                    </Paper>
                                ))}
                            </>
                        )}

                        {/* Subsections */}
                        {section.subsections && (
                            <>
                                {section.subsections.map((subsection) => (
                                    <Paper
                                        key={subsection.id}
                                        id={subsection.id}
                                        sx={{
                                            bgcolor: (theme) =>
                                                theme.palette.mode === "dark"
                                                    ? "#2a2a2a"
                                                    : "#ffffff",
                                            padding: "15px",
                                            margin: "15px 0",
                                            border: (theme) =>
                                                theme.palette.mode === "dark"
                                                    ? "1px solid #444"
                                                    : "1px solid #ddd",
                                        }}
                                    >
                                        <Typography variant='h4' gutterBottom>
                                            {subsection.title}
                                        </Typography>

                                        {subsection.description && (
                                            <Typography
                                                variant='body1'
                                                paragraph
                                            >
                                                <EnhancedKeywordLinker>
                                                    {subsection.description}
                                                </EnhancedKeywordLinker>
                                            </Typography>
                                        )}

                                        {/* Section mechanics */}
                                        {subsection.mechanics && (
                                            <Typography
                                                variant='body1'
                                                paragraph
                                                sx={{
                                                    fontStyle: "italic",
                                                    bgcolor: (theme) =>
                                                        theme.palette.mode ===
                                                        "dark"
                                                            ? "#333"
                                                            : "#f0f0f0",
                                                    p: 1,
                                                    borderRadius: 1,
                                                }}
                                            >
                                                <strong>Mechanics:</strong>{" "}
                                                <EnhancedKeywordLinker>
                                                    {subsection.mechanics}
                                                </EnhancedKeywordLinker>
                                            </Typography>
                                        )}

                                        {/* Stat explanations */}
                                        {subsection.stat_explanations && (
                                            <>
                                                <Typography
                                                    variant='body1'
                                                    paragraph
                                                    sx={{
                                                        fontWeight: "bold",
                                                        mt: 2,
                                                    }}
                                                >
                                                    Stat Breakdown:
                                                </Typography>
                                                {subsection.stat_explanations.map(
                                                    (statExp, index) => (
                                                        <Paper
                                                            key={index}
                                                            sx={{
                                                                bgcolor: (
                                                                    theme
                                                                ) =>
                                                                    theme
                                                                        .palette
                                                                        .mode ===
                                                                    "dark"
                                                                        ? "#333"
                                                                        : "#f8f8f8",
                                                                padding: "10px",
                                                                margin: "8px 0",
                                                                border: (
                                                                    theme
                                                                ) =>
                                                                    theme
                                                                        .palette
                                                                        .mode ===
                                                                    "dark"
                                                                        ? "1px solid #555"
                                                                        : "1px solid #e0e0e0",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant='subtitle2'
                                                                sx={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    color: "primary.main",
                                                                }}
                                                            >
                                                                {statExp.stat}:
                                                            </Typography>
                                                            <Typography variant='body2'>
                                                                <EnhancedKeywordLinker>
                                                                    {
                                                                        statExp.description
                                                                    }
                                                                </EnhancedKeywordLinker>
                                                            </Typography>
                                                        </Paper>
                                                    )
                                                )}
                                            </>
                                        )}

                                        {subsection.rules && (
                                            <List>
                                                {subsection.rules.map(
                                                    (rule, index) => (
                                                        <ListItem key={index}>
                                                            <Typography variant='body1'>
                                                                <EnhancedKeywordLinker>
                                                                    {rule}
                                                                </EnhancedKeywordLinker>
                                                            </Typography>
                                                        </ListItem>
                                                    )
                                                )}
                                            </List>
                                        )}

                                        {subsection.example_actions && (
                                            <>
                                                <Typography
                                                    variant='body1'
                                                    paragraph
                                                >
                                                    <strong>
                                                        Example Actions:
                                                    </strong>
                                                </Typography>
                                                <List>
                                                    {subsection.example_actions.map(
                                                        (action, index) => (
                                                            <ListItem
                                                                key={index}
                                                            >
                                                                <Typography variant='body1'>
                                                                    <EnhancedKeywordLinker>
                                                                        {action}
                                                                    </EnhancedKeywordLinker>
                                                                </Typography>
                                                            </ListItem>
                                                        )
                                                    )}
                                                </List>
                                            </>
                                        )}

                                        {subsection.examples && (
                                            <>
                                                <Typography
                                                    variant='body1'
                                                    paragraph
                                                >
                                                    <strong>Examples:</strong>
                                                </Typography>
                                                <List>
                                                    {subsection.examples.map(
                                                        (example, index) => (
                                                            <ListItem
                                                                key={index}
                                                            >
                                                                <Typography variant='body1'>
                                                                    <EnhancedKeywordLinker>
                                                                        {
                                                                            example
                                                                        }
                                                                    </EnhancedKeywordLinker>
                                                                </Typography>
                                                            </ListItem>
                                                        )
                                                    )}
                                                </List>
                                            </>
                                        )}
                                    </Paper>
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

export default RunningTheGame
