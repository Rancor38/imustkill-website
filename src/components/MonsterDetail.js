import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Button,
    Chip,
    Box,
} from "@mui/material"
import HomeButton from "./HomeButton"

const MonsterDetail = () => {
    const [monstersData, setMonstersData] = useState([])

    useEffect(() => {
        const fetchMonstersData = async () => {
            try {
                const response = await fetch("/monsters.json")
                const data = await response.json()
                setMonstersData(data)
            } catch (error) {
                console.error("Error fetching monsters data:", error)
            }
        }

        fetchMonstersData()
    }, [])

    const { name } = useParams()
    const monster = monstersData.find((monster) => monster.Name === name)

    // Helper function to determine if a monster is incorporeal
    const isIncorporeal = (monster) => {
        if (!monster) return false

        // Check if description mentions incorporeal
        const descriptionCheck =
            monster.Description?.toLowerCase().includes("incorporeal")

        // Check if immunities include Physical (common for incorporeal creatures)
        const immunityCheck =
            monster.Immunities?.toLowerCase().includes("physical")

        // Check if buffs mention non-magical weapons (another incorporeal indicator)
        const buffsCheck = monster.Buffs?.toLowerCase().includes(
            "non-magical weapons"
        )

        return descriptionCheck || (immunityCheck && buffsCheck)
    }

    if (!monster) {
        return (
            <Container
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Typography
                    variant='h2'
                    sx={{
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#e0e0e0"
                                : "#121212",
                    }}
                >
                    Monster not found
                </Typography>
                <HomeButton />
            </Container>
        )
    }

    return (
        <Container
            sx={{
                color: (theme) =>
                    theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                padding: "20px",
                paddingBottom: "100px", // Adjust this value as needed
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Typography
                variant='h3'
                gutterBottom
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    marginBottom: "20px",
                }}
            >
                {monster.Name}
            </Typography>

            {/* Incorporeal Tag */}
            {isIncorporeal(monster) && (
                <Box sx={{ marginBottom: "20px" }}>
                    <Chip
                        label='Incorporeal'
                        sx={{
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "#4a148c"
                                    : "#7b1fa2",
                            color: "#ffffff",
                            fontWeight: "bold",
                            fontSize: "0.875rem",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                    />
                </Box>
            )}
            <Paper
                sx={{
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "#1f1f1f" : "#f5f5f5",
                    padding: "20px",
                    width: "100%",
                    maxWidth: "800px",
                    marginBottom: "20px",
                    border: (theme) =>
                        theme.palette.mode === "dark"
                            ? "none"
                            : "1px solid #ccc",
                }}
            >
                <TableContainer
                    component={Paper}
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#2a2a2a"
                                : "#ffffff",
                        marginBottom: "20px",
                        border: (theme) =>
                            theme.palette.mode === "dark"
                                ? "1px solid #444"
                                : "1px solid #ccc",
                    }}
                >
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Description
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "pre-line" }}>
                                    {monster.Description}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Attack
                                </TableCell>
                                <TableCell>{monster.Attack}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Damage
                                </TableCell>
                                <TableCell>{monster.Damage}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Hit Points Multiplier
                                </TableCell>
                                <TableCell>
                                    {monster["Hit Points Multiplier"]}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Bloodied
                                </TableCell>
                                <TableCell>{monster.Bloodied}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Buffs
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "pre-line" }}>
                                    {monster.Buffs}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Crit
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "pre-line" }}>
                                    {monster["Crit fail"] ||
                                        monster["Crit Fail"]}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Immunities
                                </TableCell>
                                <TableCell>{monster.Immunities}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Body
                                </TableCell>
                                <TableCell>{monster.Body}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Agility
                                </TableCell>
                                <TableCell>{monster.Agility}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Focus
                                </TableCell>
                                <TableCell>{monster.Focus}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Fate
                                </TableCell>
                                <TableCell>{monster.Fate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        borderRight: "1px solid #ddd",
                                    }}
                                >
                                    Insight
                                </TableCell>
                                <TableCell>{monster.Insight}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button
                    component={Link}
                    to='/monsters'
                    variant='contained'
                    sx={{
                        bgcolor: "#333",
                        color: "#e0e0e0",
                        border: "1px solid #e0e0e0",
                        fontWeight: "bold",
                        marginTop: "20px",
                        "&:hover": {
                            bgcolor: "#555",
                        },
                    }}
                >
                    ← Back to Monsters
                </Button>
            </Paper>
            <HomeButton />
        </Container>
    )
}

export default MonsterDetail
