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

const CombatMechanics = () => {
    const { getCategoryRules, loading, error } = useRulesEngine()
    const [combatData, setCombatData] = useState(null)

    useEffect(() => {
        if (!loading && !error) {
            const data = getCategoryRules("combat-mechanics")
            setCombatData(data)
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
                    Error loading combat mechanics: {error}
                </Alert>
            </Container>
        )
    }

    if (!combatData) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity='warning'>No combat mechanics data found</Alert>
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
                    display: "flex",
                    paddingBottom: "100px",
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
                    {combatData.title}
                </Typography>

                {/* Render all sections dynamically */}
                {combatData.sections.map((section) => (
                    <Paper
                        key={section.id}
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

                        {/* Section description */}
                        {section.description && (
                            <Typography variant='body1' paragraph>
                                <KeywordLinker>
                                    {section.description}
                                </KeywordLinker>
                            </Typography>
                        )}

                        {/* Section rules */}
                        {section.rules && (
                            <List>
                                {section.rules.map((rule, index) => (
                                    <ListItem key={index}>
                                        <KeywordLinker>{rule}</KeywordLinker>
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Combat actions */}
                        {section.actions && (
                            <>
                                <List>
                                    {section.actions.map((action, index) => (
                                        <ListItem key={index}>
                                            <KeywordLinker>
                                                {action.name}
                                            </KeywordLinker>
                                        </ListItem>
                                    ))}
                                </List>

                                {/* Detailed action descriptions */}
                                {section.actions.map((action, index) => (
                                    <Paper
                                        key={`${action.name}-detail`}
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
                                            {action.name}:
                                        </Typography>
                                        <Typography variant='body1' paragraph>
                                            <KeywordLinker>
                                                {action.description}
                                            </KeywordLinker>
                                        </Typography>
                                    </Paper>
                                ))}
                            </>
                        )}

                        {/* Damage types */}
                        {section.types && (
                            <>
                                {section.types.map((type) => (
                                    <Paper
                                        key={type.name}
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
                                            {type.name}
                                        </Typography>
                                        <Typography variant='body1' paragraph>
                                            <KeywordLinker>
                                                {type.description}
                                            </KeywordLinker>
                                        </Typography>
                                        {type.examples && (
                                            <Typography
                                                variant='body2'
                                                paragraph
                                            >
                                                <strong>Examples:</strong>{" "}
                                                {type.examples.join(", ")}
                                            </Typography>
                                        )}
                                    </Paper>
                                ))}
                            </>
                        )}

                        {/* Equipment (shields & armor) */}
                        {section.equipment && (
                            <>
                                {section.equipment.map((item) => (
                                    <Paper
                                        key={item.name}
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
                                            {item.name}:
                                        </Typography>
                                        <Typography variant='body1' paragraph>
                                            <KeywordLinker>
                                                {item.effect}
                                            </KeywordLinker>
                                        </Typography>
                                    </Paper>
                                ))}
                            </>
                        )}

                        {/* Status conditions */}
                        {section.conditions && (
                            <>
                                {section.conditions.map((condition) => (
                                    <Paper
                                        key={condition.name}
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
                                            {condition.name}
                                        </Typography>
                                        <Typography variant='body1' paragraph>
                                            <KeywordLinker>
                                                {condition.description}
                                            </KeywordLinker>
                                        </Typography>
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

export default CombatMechanics
