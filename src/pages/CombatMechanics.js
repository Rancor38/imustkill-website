import {
    Container,
    Box,
    Typography,
    List,
    ListItem,
    Paper,
} from "@mui/material"
import HomeButton from "../components/HomeButton"

const CombatMechanics = () => {
    return (
        <>
            <Container
                sx={{
                    color: "#e0e0e0",
                    padding: "20px",
                    display: "flex",
                    paddingBottom: "100px", // Adjust this value as needed
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Typography variant='h1' gutterBottom>
                    Combat Mechanics
                </Typography>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Turns:
                    </Typography>
                    <List>
                        <ListItem>
                            Players act simultaneously, followed by monsters and
                            npcs.
                        </ListItem>
                        <ListItem>
                            The GM will inform players if their character is in
                            danger (such as a monster is targetting you with its
                            next potential attack).
                        </ListItem>
                        <ListItem>
                            GM rolls for the monster's action(s).
                        </ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Actions (In Combat):
                    </Typography>
                    <List>
                        <ListItem>Attack</ListItem>
                        <ListItem>Dodge</ListItem>
                        <ListItem>Brace</ListItem>
                        <ListItem>Gather a Spell</ListItem>
                        <ListItem>Flee</ListItem>
                        <ListItem>Negotiate</ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Attack:
                    </Typography>
                    <List>
                        <ListItem>Roll 1d10 against Attack Stat.</ListItem>
                        <ListItem>
                            If the roll is lower, deal 1 damage (2 for a natural
                            1, aka a crit).
                        </ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Dodge:
                    </Typography>
                    <List>
                        <ListItem>Roll 1d10 against Agility.</ListItem>
                        <ListItem>
                            If the roll is lower, immune to dodgeable attacks
                            until next turn.
                        </ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Brace:
                    </Typography>
                    <List>
                        <ListItem>Roll 1d10 against Body.</ListItem>
                        <ListItem>
                            If the roll is lower and you have a weapon, armor,
                            or shield, you are immune to braceable attacks until
                            next turn.
                        </ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Gather a Spell:
                    </Typography>
                    <List>
                        <ListItem>Roll 1d10 against Focus.</ListItem>
                        <ListItem>
                            If the roll is lower, draw 1 spell from your spell
                            deck.
                        </ListItem>
                        <ListItem>
                            If you roll a 10 you lose 1 hit point, and discard
                            all held spell cards.
                        </ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Flee:
                    </Typography>
                    <List>
                        <ListItem>Roll 1d10 against Agility.</ListItem>
                        <ListItem>
                            If the roll is lower, you can successfully exit the
                            combat and cannot be in danger for the next round.
                        </ListItem>
                        <ListItem>
                            If the roll fails, you remain in combat.
                        </ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Negotiate:
                    </Typography>
                    <List>
                        <ListItem>Roll 1d10 against Focus.</ListItem>
                        <ListItem>
                            If the roll is lower, combat will end momentarily to
                            present the opportunity to negotiate with a monster
                            that can understand you.
                        </ListItem>
                        <ListItem>
                            If combat resumes after negotiations fail, the
                            monster(s) go first.
                        </ListItem>
                    </List>
                </Paper>

                <Typography variant='h2' gutterBottom>
                    Weapons
                </Typography>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Weapons
                    </Typography>
                    <Typography paragraph>
                        Weapons do not have extensive effects on combat.
                    </Typography>
                    <Typography paragraph>
                        Two-weapons, polearms, and ranged weapons, or special
                        weapons let you roll 2d10s when attacking, and choose
                        the lower.
                    </Typography>
                </Paper>

                <Typography variant='h2' gutterBottom>
                    Shields & Armor
                </Typography>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Shield:
                    </Typography>
                    <Typography paragraph>
                        Roll an additional d10 when bracing, choose the lower.
                    </Typography>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Armor:
                    </Typography>
                    <Typography paragraph>
                        Roll an additional d10 when bracing, choose the lower.
                    </Typography>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        No Armor:
                    </Typography>
                    <Typography paragraph>
                        Roll 2d10s when dodging, choose the lower.
                    </Typography>
                </Paper>

                <Typography variant='h2' gutterBottom>
                    Statuses
                </Typography>

                <Paper
                    sx={{
                        bgcolor: "#1f1f1f",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Unconscious
                    </Typography>
                    <Typography paragraph>
                        A creature cannot defend against an attack, or make
                        attacks, or move. Attacks against an unconscious
                        creature automatically succeed. Creatures that survive
                        an attack while unconscious may awaken at the start of
                        their next turn.
                    </Typography>
                </Paper>
            </Container>

            <HomeButton />
        </>
    )
}

export default CombatMechanics
