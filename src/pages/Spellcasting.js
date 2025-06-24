import {
    Container,
    Typography,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material"
import { useState, useEffect } from "react"
import HomeButton from "../components/HomeButton"
import useRulesEngine from "../hooks/useRulesEngine"
import EnhancedKeywordLinker from "../components/RulesSearch/EnhancedKeywordLinker"

const Spellcasting = () => {
    const { getCategoryRules, loading, error } = useRulesEngine()
    const [spellcastingData, setSpellcastingData] = useState(null)

    useEffect(() => {
        if (!loading && !error) {
            const data = getCategoryRules("spellcasting")
            setSpellcastingData(data)
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
                    Error loading spellcasting rules: {error}
                </Alert>
            </Container>
        )
    }

    if (!spellcastingData) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity='warning'>No spellcasting data found</Alert>
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
                    {spellcastingData.title}
                </Typography>

                {/* Render all sections dynamically */}
                {spellcastingData.sections.map((section) => (
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
                                <EnhancedKeywordLinker>
                                    {section.description}
                                </EnhancedKeywordLinker>
                            </Typography>
                        )}

                        {/* Section mechanics */}
                        {section.mechanics && (
                            <Typography variant='body1' paragraph>
                                <strong>Mechanics:</strong>{" "}
                                <EnhancedKeywordLinker>
                                    {section.mechanics}
                                </EnhancedKeywordLinker>
                            </Typography>
                        )}

                        {/* Section limits */}
                        {section.limits && (
                            <Typography variant='body1' paragraph>
                                <strong>Limits:</strong>{" "}
                                <EnhancedKeywordLinker>
                                    {section.limits}
                                </EnhancedKeywordLinker>
                            </Typography>
                        )}

                        {/* Section targeting */}
                        {section.targeting && (
                            <Typography variant='body1' paragraph>
                                <strong>Targeting:</strong>{" "}
                                <EnhancedKeywordLinker>
                                    {section.targeting}
                                </EnhancedKeywordLinker>
                            </Typography>
                        )}

                        {/* Section recovery */}
                        {section.recovery && (
                            <Typography variant='body1' paragraph>
                                <strong>Recovery:</strong>{" "}
                                <EnhancedKeywordLinker>
                                    {section.recovery}
                                </EnhancedKeywordLinker>
                            </Typography>
                        )}
                    </Paper>
                ))}
            </Container>

            <HomeButton />
        </>
    )
}

export default Spellcasting
