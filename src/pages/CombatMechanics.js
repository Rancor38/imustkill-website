import { Container, Typography, List, ListItem, Paper } from "@mui/material"
import HomeButton from "../components/HomeButton"
import KeywordLinker from "../components/RulesSearch/KeywordLinker"

const CombatMechanics = () => {
    return (
        <>
            <Container
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: "20px",
                    display: "flex",
                    paddingBottom: "100px",
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
                    Combat Mechanics
                </Typography>

                <Paper
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
                        border: (theme) =>
                            theme.palette.mode === "dark"
                                ? "none"
                                : "1px solid #ccc",
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
                            GM rolls for the monsters' action(s).
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
                        <ListItem>
                            <KeywordLinker>Attack</KeywordLinker>
                        </ListItem>
                        <ListItem>
                            <KeywordLinker>Dodge</KeywordLinker>
                        </ListItem>
                        <ListItem>
                            <KeywordLinker>Brace</KeywordLinker>
                        </ListItem>
                        <ListItem>
                            <KeywordLinker>Gather a Spell</KeywordLinker>
                        </ListItem>
                        <ListItem>
                            <KeywordLinker>Flee</KeywordLinker>
                        </ListItem>
                        <ListItem>
                            <KeywordLinker>Negotiate</KeywordLinker>
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
                        Attack:
                    </Typography>
                    <List>
                        <ListItem>Roll 1d10 against Attack Stat.</ListItem>
                        <ListItem>
                            If the roll is lower, deal 1 damage (2 for a natural
                            1, aka a crit).
                        </ListItem>
                        <ListItem>
                            <KeywordLinker>
                                If your Insight is too low to perceive a monster
                                as it is, they take -1 damage from your attacks.
                            </KeywordLinker>
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
                            until next turn and regain 1 HP.
                        </ListItem>
                        <ListItem>
                            If you roll a 10 and the monster successfully
                            attacks you on this turn, the GM checks the Crit
                            Fail collumn on the Monster Stats.
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
                            next turn and regain 1 HP.
                        </ListItem>
                        <ListItem>
                            If you roll a 10 and the monster successfully
                            attacks you on this turn, the GM checks the Crit
                            Fail collumn on the Monster Stats.
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
                        <KeywordLinker>
                            Weapons do not have extensive effects on combat.
                        </KeywordLinker>
                    </Typography>
                    <Typography paragraph>
                        <KeywordLinker>
                            Two-weapons, polearms, and ranged weapons, or
                            special weapons let you roll 2d10s when attacking,
                            and choose the lower.
                        </KeywordLinker>
                    </Typography>
                </Paper>

                <Typography variant='h2' gutterBottom>
                    Damage Types
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
                        Physical Damage
                    </Typography>
                    <Typography paragraph>
                        <KeywordLinker>
                            Standard damage from conventional weapons such as
                            swords, guns, clubs, and other mundane armaments.
                            Most creatures can be harmed by physical damage,
                            though some may have resistance or immunity to
                            certain types of physical attacks.
                        </KeywordLinker>
                    </Typography>
                    <Typography paragraph>
                        <strong>Examples:</strong> Swords, firearms, clubs,
                        arrows, claws, fangs
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
                        Spiritual Damage
                    </Typography>
                    <Typography paragraph>
                        <KeywordLinker>
                            Damage that affects the soul or essence of a
                            creature. Particularly effective against undead,
                            demons, and other supernatural entities. Some
                            creatures may be vulnerable to spiritual damage
                            while being resistant to physical attacks.
                        </KeywordLinker>
                    </Typography>
                    <Typography paragraph>
                        <KeywordLinker>
                            <strong>Examples:</strong> Prayers, holy water,
                            consecrated rituals, divine magic, exorcism, curses
                        </KeywordLinker>
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
                        Hybrid Damage
                    </Typography>
                    <Typography paragraph>
                        <KeywordLinker>
                            Damage that combines both physical and spiritual
                            elements, making it effective against a wider range
                            of creatures. These weapons and attacks can harm
                            both corporeal and incorporeal beings.
                        </KeywordLinker>
                    </Typography>
                    <Typography paragraph>
                        <KeywordLinker>
                            <strong>Examples:</strong> Silver weapons, fire,
                            elemental attacks, enchanted weapons, alchemical
                            compounds
                        </KeywordLinker>
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
                        Frightened
                    </Typography>
                    <Typography paragraph>
                        <KeywordLinker>
                            A creature that is Frightened cannot attack on their
                            turn or willingly move towards the source of their
                            fear if there's another route of escape.
                        </KeywordLinker>
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
                        Unconscious
                    </Typography>
                    <Typography paragraph>
                        <KeywordLinker>
                            A creature cannot defend against an attack, or make
                            attacks, or move. Attacks against an unconscious
                            creature automatically succeed. Creatures that
                            survive an attack while unconscious may awaken at
                            the start of their next turn.
                        </KeywordLinker>
                    </Typography>
                </Paper>
            </Container>

            <HomeButton />
        </>
    )
}

export default CombatMechanics
