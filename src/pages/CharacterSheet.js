import { Container, Box, Typography } from "@mui/material"
import DownloadCharacterSheetButton from "../components/DownloadCharacterSheetButton"

const CharacterSheet = () => {
    return (
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
                variant='h2'
                gutterBottom
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                }}
            >
                Character Sheet
            </Typography>

            <Box
                sx={{
                    maxWidth: { xs: "100%", sm: "40vh" },
                    overflowX: "auto", // Allow horizontal scrolling if image is larger than viewport
                    marginBottom: { xs: "15px", sm: "20px" },
                }}
            >
                <img
                    src={`${process.env.PUBLIC_URL}/IMK Character Sheet.png`}
                    alt='Character Sheet'
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    }}
                />
            </Box>

            <DownloadCharacterSheetButton />
        </Container>
    )
}

export default CharacterSheet
