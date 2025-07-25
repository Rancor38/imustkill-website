import React from "react"
import { Link } from "react-router-dom"
import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
} from "@mui/material"
import { MoreHoriz, MenuBook, Pets, Casino, Groups } from "@mui/icons-material"
import HomeButton from "../components/HomeButton.js"

const GMTools = () => {
    const getButtonStyles = () => ({
        width: "100%",
        height: "50px",
        fontSize: "16px",
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

    const getCardStyles = () => ({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: (theme) =>
            theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
        border: (theme) =>
            theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: (theme) =>
                theme.palette.mode === "dark"
                    ? "0 8px 24px rgba(0, 0, 0, 0.5)"
                    : "0 8px 24px rgba(0, 0, 0, 0.15)",
        },
    })

    const tools = [
        {
            title: "Running the Game",
            description:
                "Comprehensive guide for Game Masters on running sessions, managing monsters, and creating engaging hunts.",
            icon: <MenuBook sx={{ fontSize: 40 }} />,
            path: "/running-the-game",
            available: true,
        },
        {
            title: "Initiative Tracker",
            description:
                "Track combat initiative order with drag-and-drop support for monsters, NPCs, players, and environmental hazards.",
            icon: <Casino sx={{ fontSize: 40 }} />,
            path: "/initiative-tracker",
            available: true,
        },
        {
            title: "Campaign Manager",
            description:
                "Manage multiple character sheets in one place with GM notes, party file saving, and combat preparation.",
            icon: <Groups sx={{ fontSize: 40 }} />,
            path: "/campaign-manager",
            available: true,
        },
        {
            title: "Bestiary",
            description:
                "Complete monster compendium with stats, abilities, and guidance for encounters.",
            icon: <Pets sx={{ fontSize: 40 }} />,
            path: "/monsters",
            available: true,
        },
        // Placeholder for future GM tools
        {
            title: "More GM Tools Coming Soon",
            description:
                "Additional tools for Game Masters will be added here to help run your sessions.",
            icon: <MoreHoriz sx={{ fontSize: 40 }} />,
            path: "#",
            available: false,
        },
    ]

    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: { xs: "10px", sm: "20px", md: 3 },
                    marginBottom: "100px",
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
                        GM Tools
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
                        Enhanced digital tools to help Game Masters run their
                        sessions
                    </Typography>
                </Box>

                <Grid container spacing={3} justifyContent='center'>
                    {tools.map((tool, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={getCardStyles()}>
                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        padding: 3,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.mode === "dark"
                                                    ? "#ffffff"
                                                    : "#121212",
                                            marginBottom: 2,
                                            opacity: tool.available ? 1 : 0.5,
                                        }}
                                    >
                                        {tool.icon}
                                    </Box>
                                    <Typography
                                        variant='h5'
                                        component='h2'
                                        gutterBottom
                                        sx={{
                                            fontWeight: "bold",
                                            opacity: tool.available ? 1 : 0.5,
                                        }}
                                    >
                                        {tool.title}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            opacity: tool.available ? 0.8 : 0.4,
                                            flexGrow: 1,
                                        }}
                                    >
                                        {tool.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ padding: 2 }}>
                                    {tool.available ? (
                                        <Button
                                            component={Link}
                                            to={tool.path}
                                            variant='contained'
                                            sx={getButtonStyles()}
                                        >
                                            Open Tool
                                        </Button>
                                    ) : (
                                        <Button
                                            variant='contained'
                                            disabled
                                            sx={{
                                                ...getButtonStyles(),
                                                opacity: 0.5,
                                            }}
                                        >
                                            Coming Soon
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <HomeButton />
        </>
    )
}

export default GMTools
