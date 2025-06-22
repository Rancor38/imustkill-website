import React, { useState } from "react"
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Collapse,
    IconButton,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const WeaponCard = ({ weapon }) => {
    const [expanded, setExpanded] = useState(false)
    const [imageError, setImageError] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const handleImageError = () => {
        setImageError(true)
    }

    return (
        <Card
            sx={{
                maxWidth: 400,
                margin: 2,
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#1f1f1f" : "#f5f5f5",
                color: (theme) =>
                    theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                border: (theme) =>
                    theme.palette.mode === "dark"
                        ? "1px solid #333"
                        : "1px solid #ccc",
                boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                        ? "0 4px 8px rgba(0, 0, 0, 0.5)"
                        : "0 4px 8px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                            ? "0 8px 16px rgba(0, 0, 0, 0.7)"
                            : "0 8px 16px rgba(0, 0, 0, 0.25)",
                },
            }}
        >
            {!imageError && (
                <CardMedia
                    component='img'
                    height='200'
                    image={weapon.image}
                    alt={weapon.name}
                    onError={handleImageError}
                    sx={{
                        objectFit: "contain",
                        backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#2a2a2a"
                                : "#f9f9f9",
                    }}
                />
            )}
            <CardContent>
                <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    sx={{
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#e0e0e0"
                                : "#121212",
                        fontWeight: "bold",
                    }}
                >
                    {weapon.name}
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#cccccc"
                                : "#555555",
                        fontStyle: "italic",
                        marginBottom: 2,
                    }}
                >
                    {weapon.quote}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant='body2' sx={{ flexGrow: 1 }}>
                        Click to view details
                    </Typography>
                    <IconButton
                        onClick={handleExpandClick}
                        sx={{
                            transform: expanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                            color: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#e0e0e0"
                                    : "#121212",
                        }}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Box>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <Box sx={{ marginTop: 2 }}>
                        {weapon.ranged && (
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#e0e0e0"
                                                : "#121212",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Ranged:
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#cccccc"
                                                : "#555555",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {weapon.ranged}
                                </Typography>
                            </Box>
                        )}
                        {weapon.melee && (
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#e0e0e0"
                                                : "#121212",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Melee:
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#cccccc"
                                                : "#555555",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {weapon.melee}
                                </Typography>
                            </Box>
                        )}
                        {weapon.special && (
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#e0e0e0"
                                                : "#121212",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Special:
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#cccccc"
                                                : "#555555",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {weapon.special}
                                </Typography>
                            </Box>
                        )}
                        {weapon.monsterEffect && (
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#e0e0e0"
                                                : "#121212",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Monster Effect:
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#cccccc"
                                                : "#555555",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {weapon.monsterEffect}
                                </Typography>
                            </Box>
                        )}
                        {weapon.dynamite && (
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#e0e0e0"
                                                : "#121212",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Dynamite:
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#cccccc"
                                                : "#555555",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {weapon.dynamite}
                                </Typography>
                            </Box>
                        )}
                        {weapon.sunlightGrenade && (
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#e0e0e0"
                                                : "#121212",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Sunlight Grenade:
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "#cccccc"
                                                : "#555555",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {weapon.sunlightGrenade}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    )
}

export default WeaponCard
