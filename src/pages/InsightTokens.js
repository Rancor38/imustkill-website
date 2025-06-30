import React, { useState, useEffect } from "react"
import {
    Container,
    Box,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper,
} from "@mui/material"
import { RestartAlt } from "@mui/icons-material"
import InsightToken from "../components/InsightToken"

const InsightTokens = () => {
    const [tokenCount, setTokenCount] = useState(1)
    const [tokenStates, setTokenStates] = useState({})

    // Load from localStorage on component mount
    useEffect(() => {
        const savedTokenCount = localStorage.getItem("insightTokenCount")
        const savedTokenStates = localStorage.getItem("insightTokenStates")

        if (savedTokenCount) {
            setTokenCount(parseInt(savedTokenCount, 10))
        }

        if (savedTokenStates) {
            try {
                setTokenStates(JSON.parse(savedTokenStates))
            } catch (error) {
                console.error(
                    "Error parsing token states from localStorage:",
                    error
                )
            }
        }
    }, [])

    // Save to localStorage whenever tokenCount changes
    useEffect(() => {
        localStorage.setItem("insightTokenCount", tokenCount.toString())
    }, [tokenCount])

    // Save to localStorage whenever tokenStates changes
    useEffect(() => {
        localStorage.setItem("insightTokenStates", JSON.stringify(tokenStates))
    }, [tokenStates])

    const handleTokenCountChange = (event) => {
        const newCount = event.target.value
        setTokenCount(newCount)

        // Clear token states that are beyond the new count
        setTokenStates((prevStates) => {
            const newStates = { ...prevStates }
            Object.keys(newStates).forEach((tokenId) => {
                if (parseInt(tokenId, 10) >= newCount) {
                    delete newStates[tokenId]
                }
            })
            return newStates
        })
    }

    const handleTokenFlip = (tokenId) => {
        setTokenStates((prevStates) => ({
            ...prevStates,
            [tokenId]: !prevStates[tokenId],
        }))
    }

    const handleReset = () => {
        localStorage.removeItem("insightTokenCount")
        localStorage.removeItem("insightTokenStates")
        setTokenCount(1)
        setTokenStates({})
    }

    const getButtonStyles = () => ({
        fontSize: { xs: "14px", sm: "16px" },
        bgcolor: "var(--button-bg)",
        color: "var(--button-text)",
        border: (theme) =>
            theme.palette.mode === "dark"
                ? "2px solid #ffffff"
                : "2px solid var(--button-bg)",
        borderRadius: "8px",
        boxShadow: (theme) =>
            theme.palette.mode === "dark"
                ? "0 4px 8px rgba(0, 0, 0, 0.3)"
                : "0 4px 8px rgba(0, 0, 0, 0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
            bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#e0e0e0" : "#e9e9e9",
            transform: "scale(1.05)",
            boxShadow: (theme) =>
                theme.palette.mode === "dark"
                    ? "0 8px 16px rgba(0, 0, 0, 0.5)"
                    : "0 8px 16px rgba(0, 0, 0, 0.25)",
        },
    })

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                color: (theme) =>
                    theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                padding: { xs: "10px", sm: "20px", md: 3 },
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    marginBottom: 4,
                    marginTop: { xs: 2, sm: 4 },
                }}
            >
                <Typography
                    variant='h3'
                    component='h1'
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        textShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "none"
                                : "0px 1px 2px rgba(0,0,0,0.1)",
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                        marginBottom: 2,
                    }}
                >
                    Insight Tokens
                </Typography>
                <Typography
                    variant='h6'
                    sx={{
                        opacity: 0.8,
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}
                >
                    Manage your insight tokens - click to flip between front and
                    back
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    gap: 3,
                    marginBottom: 4,
                    justifyContent: "center",
                }}
            >
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel
                        id='token-count-label'
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#e0e0e0"
                                    : "#121212",
                        }}
                    >
                        Token Count
                    </InputLabel>
                    <Select
                        labelId='token-count-label'
                        value={tokenCount}
                        label='Token Count'
                        onChange={handleTokenCountChange}
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#e0e0e0"
                                    : "#121212",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "#ffffff"
                                        : "#121212",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "#ffffff"
                                        : "#121212",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "#ffffff"
                                        : "#121212",
                            },
                        }}
                    >
                        {[...Array(10)].map((_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant='contained'
                    startIcon={<RestartAlt />}
                    onClick={handleReset}
                    sx={getButtonStyles()}
                >
                    Reset All
                </Button>
            </Box>

            <Paper
                sx={{
                    padding: 3,
                    backgroundColor: (theme) =>
                        theme.palette.mode === "dark"
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.05)",
                    border: (theme) =>
                        theme.palette.mode === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.1)"
                            : "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    minHeight: "300px",
                }}
            >
                <Grid
                    container
                    spacing={2}
                    justifyContent='center'
                    alignItems='center'
                >
                    {[...Array(tokenCount)].map((_, index) => (
                        <Grid item key={index}>
                            <InsightToken
                                id={index}
                                isFlipped={tokenStates[index] || false}
                                onFlip={handleTokenFlip}
                                size={100}
                            />
                        </Grid>
                    ))}
                </Grid>

                {tokenCount === 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "200px",
                        }}
                    >
                        <Typography
                            variant='h6'
                            sx={{
                                opacity: 0.6,
                                textAlign: "center",
                            }}
                        >
                            Select a token count to get started
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    )
}

export default InsightTokens
