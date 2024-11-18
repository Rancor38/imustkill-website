import { Container, Typography, Paper, List, ListItem } from '@mui/material';
import HomeButton from '../components/HomeButton';

const Progression = () => {
    return (
        <>
            <Container
                sx={{
                    color: '#e0e0e0',
                    padding: '20px',
                    paddingBottom: '100px', // Adjust this value as needed
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h1" gutterBottom>
                    Progression
                </Typography>

                <Paper
                    sx={{
                        bgcolor: '#1f1f1f',
                        padding: '20px',
                        width: '100%',
                        maxWidth: '800px',
                        marginBottom: '20px',
                    }}
                >
                    <Typography variant="h2" gutterBottom>
                        Leveling Up
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>You level up after you survive a Fight and rest, you can then:</strong>
                    </Typography>
                    <List>
                        <ListItem>Roll 1d10 against 1 chosen stat.</ListItem>
                        <ListItem>If the roll is lower, increase the stat by 1 (max 10).</ListItem>
                    </List>
                    <Typography variant="body1" paragraph>
                        Or you can:
                    </Typography>
                    <List>
                        <ListItem>Gain Insight. Insight is a resource you can gather that provides benefits while also subjecting you to higher levels of challenge (see Insight).</ListItem>
                    </List>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: '#1f1f1f',
                        padding: '20px',
                        width: '100%',
                        maxWidth: '800px',
                        marginBottom: '20px',
                    }}
                >
                    <Typography variant="h2" gutterBottom>
                        Insight
                    </Typography>
                    <Typography variant="body1" paragraph>
                        A character with Insight gains the ability to reroll any tests they make during a given day a number of times equal to their quantity of Insight. These rerolls are available again after a Night’s Rest.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Insight allows a hunter to see hidden creatures, lights, and objects, learn more about the nature of the cosmos, and see threats to mankind that would otherwise remain hidden.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Insight is capped at 10, at this point your hunter is considered <strong>ascendant</strong>.
                    </Typography>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: '#1f1f1f',
                        padding: '20px',
                        width: '100%',
                        maxWidth: '800px',
                        marginBottom: '20px',
                    }}
                >
                    <Typography variant="h2" gutterBottom>
                        Ascendant
                    </Typography>
                    <Typography variant="body1" paragraph>
                        When you reach the point of Hunter Ascendant, you are granted an audience with the Old Man or Ancient Mistress, and may make a wish for a price of all 10 insight points.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        A wish can be for anything that complies with the following limitations, but otherwise will be administered fairly within the wisher's intentions, avoiding monkey’s paws and verbal gotchas:
                    </Typography>
                    <List>
                        <ListItem><strong>Time Manipulation:</strong> Wishes cannot alter the flow of time, as this could have catastrophic consequences on the fabric of reality.</ListItem>
                        <ListItem><strong>Limited Scope:</strong> Wishes cannot alter certain fundamental aspects of reality, such as the laws of physics or the nature of existence.</ListItem>
                        <ListItem><strong>No Interference with Free Will:</strong> Wishes cannot be used to directly control or manipulate the actions of others, ensuring that individuals retain their autonomy.</ListItem>
                        <ListItem><strong>No Unlimited Power:</strong> Wishes cannot grant the wisher unlimited power or omnipotence.</ListItem>
                        <ListItem><strong>Limited Knowledge:</strong> Characters may not fully understand the consequences of their wishes or the true nature of the wish-granting entity, leading to unforeseen complications.</ListItem>
                        <ListItem><strong>Consequences for Selfish Wishes:</strong> Selfish or malicious wishes may come with unintended consequences or backlash.</ListItem>
                    </List>
                </Paper>
            </Container>

            <HomeButton />
        </>
    );
};

export default Progression;
