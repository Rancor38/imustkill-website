import { Container, Typography, Paper } from '@mui/material';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';

const Spellcasting = () => {
    return (
        <>
            <Container
                sx={{
                    bgcolor: '#121212',
                    color: '#e0e0e0',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h1" gutterBottom>
                    Spellcasting
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
                    <Typography variant="body1" paragraph>
                        Test focus to gather a spell, if you succeed you can draw a spell card from your spell deck, and keep this card until your next night’s rest.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You can only have 3 spells gathered at one time.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You can play spell cards at any time triggering their effect. Follow the instructions on the spell card.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You cannot target something with a spell if you cannot perceive it, although you might still be able to harm it.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You cannot select a target without a clear unbroken line from you to the location of it.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Discarded spells can be returned to your spell deck when you complete a night’s rest.
                    </Typography>
                </Paper>
            </Container>

            <HomeButton />
        </>
    );
};

export default Spellcasting;
