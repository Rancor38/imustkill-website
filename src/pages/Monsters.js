import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
    Container,
    Typography,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from "@mui/material"
import HomeButton from "../components/HomeButton"
import Section from "../components/Section"

const Monsters = () => {
    const [monstersData, setMonstersData] = useState([])
    const [filteredMonsters, setFilteredMonsters] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("name")
    const [damageTypeFilter, setDamageTypeFilter] = useState("all")

    useEffect(() => {
        const fetchMonstersData = async () => {
            try {
                const response = await fetch("/monsters.json")
                const data = await response.json()
                setMonstersData(data)
                setFilteredMonsters(data)
            } catch (error) {
                console.error("Error fetching monsters data:", error)
            }
        }

        fetchMonstersData()
    }, [])

    useEffect(() => {
        let filtered = monstersData.filter((monster) => {
            const matchesSearch = monster.Name.toLowerCase().includes(
                searchTerm.toLowerCase()
            )

            let matchesDamageType = true
            if (damageTypeFilter !== "all") {
                matchesDamageType = monster.Immunities === damageTypeFilter
            }

            return matchesSearch && matchesDamageType
        })

        // Sort the filtered monsters
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.Name.localeCompare(b.Name)
                case "attack":
                    const getAttackValue = (attack) => {
                        const match = attack.match(/(\d+)/)
                        return match ? parseInt(match[1]) : 0
                    }
                    return getAttackValue(b.Attack) - getAttackValue(a.Attack)
                case "damage":
                    return parseInt(b.Damage) - parseInt(a.Damage)
                case "hitPoints":
                    const getHPValue = (hp) => {
                        const match = hp.match(/(\d+)/)
                        return match ? parseInt(match[1]) : 0
                    }
                    return (
                        getHPValue(b["Hit Points Multiplier"]) -
                        getHPValue(a["Hit Points Multiplier"])
                    )
                default:
                    return a.Name.localeCompare(b.Name)
            }
        })

        setFilteredMonsters(filtered)
    }, [monstersData, searchTerm, sortBy, damageTypeFilter])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSortChange = (event) => {
        setSortBy(event.target.value)
    }

    const handleDamageTypeChange = (event) => {
        setDamageTypeFilter(event.target.value)
    }

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
                            Monsters
                        </Typography>

                        {/* Filter and Sort Controls */}
                        <Box
                            sx={{
                                marginBottom: "20px",
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                            }}
                        >
                            <TextField
                                label='Search monsters'
                                variant='outlined'
                                size='small'
                                value={searchTerm}
                                onChange={handleSearchChange}
                                sx={{ minWidth: 200 }}
                            />

                            <FormControl size='small' sx={{ minWidth: 150 }}>
                                <InputLabel>Sort by</InputLabel>
                                <Select
                                    value={sortBy}
                                    label='Sort by'
                                    onChange={handleSortChange}
                                >
                                    <MenuItem value='name'>Name (A-Z)</MenuItem>
                                    <MenuItem value='attack'>
                                        Attack (High-Low)
                                    </MenuItem>
                                    <MenuItem value='damage'>
                                        Damage (High-Low)
                                    </MenuItem>
                                    <MenuItem value='hitPoints'>
                                        Hit Points (High-Low)
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size='small' sx={{ minWidth: 180 }}>
                                <InputLabel>Filter by Immunities</InputLabel>
                                <Select
                                    value={damageTypeFilter}
                                    label='Filter by Immunities'
                                    onChange={handleDamageTypeChange}
                                >
                                    <MenuItem value='all'>All</MenuItem>
                                    <MenuItem value='Physical'>
                                        Physical
                                    </MenuItem>
                                    <MenuItem value='Spiritual'>
                                        Spiritual
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <div
                            className='monster-listinator'
                            style={{ marginTop: "20px" }}
                        >
                            {filteredMonsters.map((monster, index) => (
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            variant='body1'
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {monster.Name}
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            sx={{ opacity: 0.7 }}
                                        >
                                            Attack: {monster.Attack} | Damage:{" "}
                                            {monster.Damage}
                                        </Typography>
                                    </Box>
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
