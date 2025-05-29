import React from "react"
import { Link } from "react-router-dom"
import { Button, Container } from "@mui/material"

const DownloadCharacterSheetButton = () => {
    return (
        <div
            style={{
                position: "fixed",
                bottom: "30px", // Adjust padding from the bottom
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000, // Ensures it stays on top
                padding: "0 20px",
                width: "100%",
                maxWidth: "320px",
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stack vertically on mobile
                    gap: { xs: 1, sm: 2 }, // Smaller gap on mobile
                    justifyContent: "center", // Center buttons horizontally
                    padding: { xs: "8px", sm: "10px" },
                }}
            >
                <Button
                    component={Link}
                    to='/'
                    variant='contained'
                    sx={{
                        width: "auto",
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
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#e0e0e0"
                                    : "#e9e9e9",
                            transform: {
                                xs: "scale(1.02)",
                                sm: "scale(1.05) translateX(10px)",
                            },
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                        },
                        textTransform: "none",
                    }}
                >
                    Go to Home
                </Button>
                <Button
                    component='a'
                    href={`${process.env.PUBLIC_URL}/IMK Character Sheet.pdf`}
                    download
                    variant='contained'
                    sx={{
                        width: "auto",
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
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#e0e0e0"
                                    : "#e9e9e9",
                            transform: "scale(1.05) translateX(10px)",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                        },
                        textTransform: "none",
                    }}
                >
                    Download PDF
                </Button>
            </Container>
        </div>
    )
}

export default DownloadCharacterSheetButton
