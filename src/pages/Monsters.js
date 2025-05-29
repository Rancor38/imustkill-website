import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Typography, Paper, Grid } from "@mui/material"
import HomeButton from "../components/HomeButton"
import Section from "../components/Section"

const Monsters = () => {
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

    return (
        <>
            <Container
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: "20px",
                    display: "flex",
                    paddingBottom: "100px", // Adjust this value as needed
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
                    Monsters
                </Typography>
                <Paper
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
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
                    <Section>
                        <Typography variant='h2' gutterBottom>
                            A-Z
                        </Typography>
                        <div
                            className='monster-listinator'
                            style={{ marginTop: "20px" }}
                        >
                            {monstersData.map((monster, index) => (
                                <Link
                                    to={`/monsters/${monster.Name}`}
                                    key={index}
                                    className='monster-link'
                                    style={{
                                        display: "block",
                                        textDecoration: "none",
                                        padding: "10px",
                                        borderRadius: "4px",
                                        transition:
                                            "background-color 0.3s, color 0.3s",
                                    }}
                                >
                                    {monster.Name}
                                </Link>
                            ))}
                        </div>
                    </Section>
                </Paper>
            </Container>

            <HomeButton />
        </>
    )
}

export default Monsters
