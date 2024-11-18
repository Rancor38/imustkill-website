import { Container, Typography, Paper } from '@mui/material';
import HomeButton from '../components/HomeButton';

const DeathAndResting = () => {
    return (
        <>
            <Container
                sx={{
                    color: '#e0e0e0',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h1" gutterBottom>
                    Death and Resting
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
                        Death
                    </Typography>
                    <Typography variant="body1" paragraph>
                        When you reach 0 hit points, test Fate. On a success you live with 1 hit point.
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
                        Grit Teeth
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Once per night’s rest you can regain 1 hit point during a 1-minute respite from combat.
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
                        Night’s Rest
                    </Typography>
                    <Typography variant="body1" paragraph>
                        A comfortable place to sleep at an inn, a farmer’s house, or beside your campfire for the night. As long as you rest for 8 hours, and sleep for at least 6 of those, you regain all hit points.
                    </Typography>
                </Paper>

                <Paper
                    sx={{
                        bgcolor: '#1f1f1f',
                        padding: '20px',
                        width: '100%',
                        maxWidth: '800px',
                        marginBottom: '90px',
                    }}
                >
                    <Typography variant="h2" gutterBottom>
                        Dead
                    </Typography>
                    <Typography variant="body1" paragraph>
                        When a character dies you aren't out of the game. The dead can assist their allies in combat from beyond the grave.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Once dead, you can choose to strike a feature from your character's sheet at any time and add value to a living player character of your choice. These abilities last until the start of the selected character’s next turn.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        For example, you can choose to strike off your late character’s body score, and replace a living character’s tests with their Body score with a 1 until the start of their next turn.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You can cross out Body, Agility, Focus, and Fate in this way. Additionally, you can give up each insight token and provide a living character a reroll on any test, before discarding the token.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You can do these things at any time, even in response to a monster attack or a PC missing an attack, etc. to attempt to change the result.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Once all abilities and insight are stricken from your character, they have reached their final death, and may finally rest in peace.
                    </Typography>
                </Paper>
            </Container>

            <HomeButton />
        </>
    );
};

export default DeathAndResting;
