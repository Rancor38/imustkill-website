import React from "react"
import { Container, Typography, Box, Grid } from "@mui/material"
import HomeButton from "../components/HomeButton"
import WeaponCard from "../components/WeaponCard"

// Import weapon images
import redeemerRevolverImage from "../darkwatch-images/redeemer-revolver.png"
import dualPistolsImage from "../darkwatch-images/dual-pistols.png"
import carsonRangeRifleImage from "../darkwatch-images/carson-range-rifle.png"
import argusShotgunImage from "../darkwatch-images/argus-shotgun.png"
import railRocketImage from "../darkwatch-images/rail-rocket.png"
import dynamiteGrenadesImage from "../darkwatch-images/dynamite-or-grenades.png"

const weaponsData = [
    {
        name: "Redeemer Revolver & Hexblade",
        image: redeemerRevolverImage,
        quote: '"Rapid fire, rapid reload. Kill \'em faster than they can scream."',
        ranged: "Roll 2d10, take the lower result.\n\nCrit: Fan the hammer and fire an additional 2 shots immediately.",
        melee: "Crit: Severs a limb, tail, or wing.",
    },
    {
        name: "Dual Pistols & Twin Blades",
        image: dualPistolsImage,
        quote: "\"When firepower isn't enough, just cut 'em down.\"",
        ranged: "Fires twice per turn.\n\nCrit: Both shots on this turn land for 4 total damage.",
        melee: "Crit: Slashes 2 limbs limb, tail, or wings clean off.",
    },
    {
        name: "Carson Range Rifle & Axebutt",
        image: carsonRangeRifleImage,
        quote: '"One shot. One kill."',
        ranged: "Roll 2d10, take the lowest result.\n\nSpecial: If 2 d10s crit on the creature, one of its heads are blown off.",
        melee: "Crit: Big cut dealing 3 damage.",
    },
    {
        name: "Argus Shotgun & Guillotine Axe",
        image: argusShotgunImage,
        quote: '"The only thing left will be pieces."',
        ranged: "Roll 1d10. Hits up to 3 adjacent enemies.\n\nCrit: Dismembers a limb, tail, or wing.",
        melee: "Crit: Instantly decapitates the enemy.",
    },
    {
        name: "Rail Rocket & Titan's Hammer",
        image: railRocketImage,
        quote: '"Blow it up. If it still moves, hit it with the hammer."',
        ranged: "Choose a point within range, all creatures within 10' of that point must test Agility, if they fail they take 2 damage, if they roll a 10 they take 4 damage.",
        melee: "Crit: Crushes a limb, tail, or wing, crippling movement.",
    },
    {
        name: "Dynamite & Sunlight Grenades",
        image: dynamiteGrenadesImage,
        quote: '"Boom."',
        dynamite:
            "Choose a point within range, all creatures within 10' of that point must test Agility, if they fail they take 2 damage, if they roll a 10 they take 4 damage.",
        sunlightGrenade:
            "Same as Dynamite, but it only damages unliving things.",
    },
]

const DarkwatchGame = () => {
    return (
        <>
            <Container
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: "20px",
                    paddingBottom: "100px",
                    display: "flex",
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
                        textAlign: "center",
                        marginBottom: 3,
                        fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    }}
                >
                    Darkwatch Arsenal
                </Typography>

                <Typography
                    variant='h4'
                    gutterBottom
                    sx={{
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#cccccc"
                                : "#555555",
                        textAlign: "center",
                        marginBottom: 4,
                        fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2rem" },
                    }}
                >
                    Tools of the Hunt
                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "1200px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Grid container spacing={3} justifyContent='center'>
                        {weaponsData.map((weapon, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <WeaponCard weapon={weapon} />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>

            <HomeButton />
        </>
    )
}

export default DarkwatchGame
