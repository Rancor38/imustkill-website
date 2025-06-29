import React from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { Box } from "@mui/material"
import HomePage from "./pages/HomePage.js"
import CharacterCreation from "./pages/CharacterCreation.js"
import Equipment from "./pages/Equipment.js"
import CombatMechanics from "./pages/CombatMechanics.js"
import DeathAndResting from "./pages/DeathAndResting.js"
import Spellcasting from "./pages/Spellcasting.js"
import Progression from "./pages/Progression.js"
import Spells from "./pages/Spells.js"
import CharacterSheet from "./pages/CharacterSheet.js"
import RunningTheGame from "./pages/RunningTheGame.js"
import Monsters from "./pages/Monsters.js"
import MonsterDetail from "./components/MonsterDetail.js"
import DarkwatchGame from "./pages/DarkwatchGame.js"
import Sparks from "./components/Sparks/Sparks.jsx"
import BackButton from "./components/BackButton/BackButton.js"
import ThemeToggle from "./components/ThemeToggle/ThemeToggle.js"

function App() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                color: "text.primary",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Sparks />
            <BackButton />
            <ThemeToggle />
            <Routes>
                <Route path='/' element={<Outlet />}>
                    <Route
                        path='character-creation'
                        element={<CharacterCreation />}
                    />
                    <Route
                        path='character-sheet'
                        element={<CharacterSheet />}
                    />
                    <Route path='equipment' element={<Equipment />} />
                    <Route
                        path='combat-mechanics'
                        element={<CombatMechanics />}
                    />
                    <Route
                        path='death-and-resting'
                        element={<DeathAndResting />}
                    />
                    <Route path='spellcasting' element={<Spellcasting />} />
                    <Route path='spells' element={<Spells />} />
                    <Route path='progression' element={<Progression />} />
                    <Route
                        path='running-the-game'
                        element={<RunningTheGame />}
                    />
                    <Route path='monsters' element={<Monsters />} />
                    <Route path='monsters/:name' element={<MonsterDetail />} />
                    <Route path='darkwatch' element={<DarkwatchGame />} />
                    <Route path='/' element={<HomePage />} />
                </Route>
            </Routes>
        </Box>
    )
}

export default App
