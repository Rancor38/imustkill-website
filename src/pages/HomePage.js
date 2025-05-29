import { Link } from "react-router-dom"
import { Container, Box, Typography, Button } from "@mui/material"
import FlashyMenu from "../components/FlashyMenu"

// Helper function for consistent button styling
const getButtonStyles = () => ({
    width: "100%",
    maxWidth: { xs: "280px", sm: "300px" },
    height: { xs: "50px", sm: "60px" },
    fontSize: { xs: "16px", sm: "18px" },
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
    marginBottom: { xs: "8px", sm: "10px" },
    "&:hover": {
        bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#e0e0e0" : "#e9e9e9",
        transform: { xs: "scale(1.02)", sm: "scale(1.05) translateX(10px)" },
        boxShadow: (theme) =>
            theme.palette.mode === "dark"
                ? "0 8px 16px rgba(0, 0, 0, 0.5)"
                : "0 8px 16px rgba(0, 0, 0, 0.25)",
    },
})

const HomePage = () => {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                color: (theme) =>
                    theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                padding: { xs: "10px", sm: "20px", md: 0 },
            }}
        >
            <header
                style={{
                    textAlign: "center",
                    padding: "20px 0",
                }}
            >
                <Typography
                    variant='h1'
                    component='h1'
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
                        fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    }}
                >
                    I Must Kill
                </Typography>
                <Typography
                    variant='h3'
                    component='h3'
                    sx={{
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#e0e0e0"
                                : "#121212",
                        textShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "none"
                                : "0px 1px 2px rgba(0,0,0,0.1)",
                        fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2rem" },
                    }}
                >
                    The hunt awaits you...
                </Typography>
            </header>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                    gap: 2, // Space out the buttons more
                }}
            >
                <FlashyMenu
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2, // Space out the buttons more
                    }}
                >
                    <Button
                        component={Link}
                        to='/character-creation'
                        variant='contained'
                        sx={{
                            width: "100%",
                            maxWidth: "300px",
                            height: "60px",
                            fontSize: "18px",
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
                            marginBottom: "10px",
                            "&:hover": {
                                bgcolor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "#e0e0e0"
                                        : "#e9e9e9",
                                transform: "scale(1.05) translateX(10px)",
                                boxShadow: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "0 8px 16px rgba(0, 0, 0, 0.5)"
                                        : "0 8px 16px rgba(0, 0, 0, 0.25)",
                            },
                        }}
                    >
                        Character Creation
                    </Button>
                    <Button
                        component={Link}
                        to='/character-sheet'
                        variant='contained'
                        sx={getButtonStyles()}
                    >
                        Character Sheet
                    </Button>
                    <Button
                        component={Link}
                        to='/equipment'
                        variant='contained'
                        sx={getButtonStyles()}
                    >
                        Equipment Deck
                    </Button>
                    <Button
                        component={Link}
                        to='/combat-mechanics'
                        variant='contained'
                        sx={getButtonStyles()}
                    >
                        Combat Mechanics
                    </Button>
                    <Button
                        component={Link}
                        to='/death-and-resting'
                        variant='contained'
                        sx={getButtonStyles()}
                    >
                        Death and Resting
                    </Button>
                    <Button
                        component={Link}
                        to='/progression'
                        variant='contained'
                        sx={getButtonStyles()}
                    >
                        Progression
                    </Button>
                    <Button
                        component={Link}
                        to='/spellcasting'
                        variant='contained'
                        sx={getButtonStyles()}
                    >
                        Spellcasting
                    </Button>
                    <Button
                        component={Link}
                        to='/spells'
                        variant='contained'
                        sx={getButtonStyles()}
                    >
                        Spells
                    </Button>
                    <Button
                        component={Link}
                        to='/running-the-game'
                        variant='contained'
                        sx={{
                            ...getButtonStyles(),
                            textAlign: "center",
                        }}
                    >
                        Running the Game
                        <br />
                        (GM's Only)
                    </Button>
                    <Button
                        component={Link}
                        to='/monsters'
                        variant='contained'
                        sx={getButtonStyles()}
                    >
                        Monsters <br /> (GM's Only)
                    </Button>
                </FlashyMenu>
            </Box>

            <Box
                component='footer'
                sx={{
                    textAlign: "center",
                    padding: "20px 0",
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "#1f1f1f" : "#f0f0f0",
                    borderTop: (theme) =>
                        theme.palette.mode === "dark"
                            ? "none"
                            : "1px solid #ccc",
                }}
            >
                <Typography
                    variant='body2'
                    sx={{
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#e0e0e0"
                                : "#121212",
                        fontWeight: (theme) =>
                            theme.palette.mode === "dark" ? "normal" : 500,
                    }}
                >
                    &copy; 2024 I Must Kill. All rights reserved.
                </Typography>
            </Box>
        </Container>
    )
}

export default HomePage
