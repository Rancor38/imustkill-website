import {
    Container,
    Box,
    Typography,
    List,
    ListItem,
    Paper,
} from "@mui/material"
import { Link } from "react-router-dom"
import HomeButton from "../components/HomeButton"

const CharacterCreation = () => {
    return (
        <>
            <Container
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "#e0e0e0" : "#121212",
                    padding: { xs: "15px", sm: "20px" },
                    display: "flex",
                    paddingBottom: { xs: "80px", sm: "100px" }, // Adjust this value as needed
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
                        textShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "none"
                                : "0px 1px 2px rgba(0,0,0,0.1)",
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                        textAlign: "center",
                    }}
                >
                    Character Creation
                </Typography>

                <Paper
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
                        padding: { xs: "15px", sm: "20px" },
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: { xs: "15px", sm: "20px" },
                        border: (theme) =>
                            theme.palette.mode === "dark"
                                ? "none"
                                : "1px solid #ccc",
                        boxShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "0 4px 8px rgba(0,0,0,0.5)"
                                : "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Stats:
                    </Typography>
                    <List>
                        <ListItem>
                            Body (Lift, push, climb, drag, grapple, jump, swim)
                        </ListItem>
                        <ListItem>
                            Agility (Catch, squeeze, pick lock, escape manacles)
                        </ListItem>
                        <ListItem>
                            Focus (Perceive, listen, conjure magic, track prey,
                            control will, resist enchantment)
                        </ListItem>
                        <ListItem>
                            Fate (Luck, life force, fortune, death)
                        </ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#e0e0e0"
                                : "#121212",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Standard Stat Arrays:
                    </Typography>
                    <Typography paragraph>
                        Choose from predefined array.
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        Arrays:
                    </Typography>
                    <List>
                        <ListItem>6, 6, 6, 6</ListItem>
                        <ListItem>4, 4, 8, 8</ListItem>
                        <ListItem>3, 4, 8, 9</ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#e0e0e0"
                                : "#121212",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Rolling Stats (Alternative Option):
                    </Typography>
                    <List>
                        <ListItem>Roll 4d10s for character creation.</ListItem>
                        <ListItem>
                            Assign the values rolled to Body, Agility, Focus,
                            and Fate.
                        </ListItem>
                        <ListItem>
                            Maximum stat value is 10, minimum is a 2.
                        </ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#e0e0e0"
                                : "#121212",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Attack Stat and Hit Points:
                    </Typography>
                    <List>
                        <ListItem>
                            Choose Body, Agility, or Focus as your attack stat.
                        </ListItem>
                        <ListItem>
                            Half of Fate (rounded up) is your hit points.
                        </ListItem>
                    </List>
                </Paper>

                <Typography variant='h2' gutterBottom>
                    Equipment
                </Typography>

                <Paper
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#e0e0e0"
                                : "#121212",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant='h3' gutterBottom>
                        Random Start
                    </Typography>
                    <Typography paragraph>
                        Draw 10 equipment cards from the Starter Deck per player
                        at the table, and each player can choose up to 10 from
                        the whole lot.
                    </Typography>
                    <Typography variant='h3' gutterBottom>
                        Fixed Start
                    </Typography>
                    <Typography paragraph>
                        Choose 10 cards from your character deck to outfit your
                        hunter.
                    </Typography>
                </Paper>

                <Typography variant='h2' gutterBottom>
                    Adventuring Assumptions
                </Typography>

                <Paper
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#1f1f1f"
                                : "#f5f5f5",
                        color: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#e0e0e0"
                                : "#121212",
                        padding: "20px",
                        width: "100%",
                        maxWidth: "800px",
                        marginBottom: "20px",
                    }}
                >
                    <Typography paragraph>
                        Your character is competent, and capable of taking care
                        of themselves under normal circumstances. Does your
                        character have bandages to bind small wounds? This can
                        be assumed. Do you have water at your camp? Probably. Do
                        you have food? Most likely. Unless the GM tells you of
                        some extenuating circumstances that might prevent your
                        character from having their basic needs met they are
                        assumed to be met.
                    </Typography>
                    <Typography paragraph>
                        Equipment gained from equipment packs are not assumed to
                        be an exhaustive list of all of the equipment on your
                        person but are a few key items. Items beyond these can
                        be discussed and requested from the GM to their
                        discretion in line with what is reasonable.
                    </Typography>
                    <Typography paragraph>
                        Likewise, money is to be kept in general terms. You
                        either have enough money, or you do not. High pay is
                        enough to pick up a few things of value or take some
                        weeks (or months) off work before the next hunt. You
                        otherwise have enough money for yourselves with little
                        generosity.
                    </Typography>
                </Paper>
            </Container>

            <HomeButton />
        </>
    )
}

export default CharacterCreation
