import { Container, Typography, Paper, List, ListItem } from '@mui/material';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';

const RunningTheGame = () => {
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
                    Running the Game
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
                        The Hunt Outline
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The following is a section-by-section general outline of how to structure your hunts within the game of I Must Kill. These aren't prescriptive, but are a good jumping off point to build your adventure.
                    </Typography>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            The Hook:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Players are introduced to the scenario.
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            Negotiate Pay:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Test Focus, you bargain for high pay, otherwise you agree to low pay.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            High pay is enough to have spending money later, low pay is enough only for subsistence.
                        </Typography>
                    </Section>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            The Rumor Phase:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Meet someone who can tell you information about the monster. They present rumors for the monster. (Rumors are curated by the GM with true and misleading information about the monster).
                        </Typography>
                        <Typography variant="body1" paragraph>
                            The GM chooses which of these rumors is true in this given scenario.
                        </Typography>
                    </Section>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            The Research Phase:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            An old journal, a tale from long ago, an old friend. You reach out to learn information about the monster, and test Fate to learn its weakness (draw a weakness from the Weaknesses deck)
                        </Typography>
                    </Section>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            Prepare
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Use the information you’ve learned to procure what you need for the hunt (if reasonably available).
                        </Typography>
                    </Section>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            Tracking the Monster:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Find the monster in its home (test Fate) or it ambushes you.
                        </Typography>
                    </Section>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            The Fight
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Battle the monster, win or die.
                        </Typography>
                    </Section>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            Denouement
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Collect the bounty
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Replenish equipment up to 10, and if high pay, everyone can purchase new equipment.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Rest and level up
                        </Typography>
                    </Section>
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
                        Creatures of False-Eden
                    </Typography>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            Explanation of Hidden Creatures
                        </Typography>
                        <List>
                            <ListItem>
                                Monsters have a rating of Insight required before a hunter can see them as they are. These creatures are metaphysical threats that challenge perception of the physical realm. On the highest end, these creatures target the spirit, a human’s concept of time, and represent the vast and uncaring realms of deep space and sea.
                            </ListItem>
                            <ListItem>
                                All monsters that lie beyond a human’s Insight appear as beasts rationalized by the context the human has. They might perceive a werewolf as a large bear, or a changeling as a deformed man.
                            </ListItem>
                        </List>
                    </Section>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            The Downsides of Insight
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Having higher insight enables hunters to perceive entities that others cannot. However, exceeding your fellow hunters' insight scores may pose risks. For instance, if a poltergeist requires an insight score of 5, and only your hunter has this much insight, then only your hunter can see it. Without the necessary insight, combatting the poltergeist is impossible. Your hunter's attacks, coupled with their insight, become effective and can deal damage, but this also draws the poltergeist's attention who will target your hunter viciously. Fellow hunters, lacking the required insight, would struggle to assist effectively, resorting to perhaps dragging you out of the poltergeist’s clawing grasp or aiding you with spells, but they cannot perceive or attack the poltergeist.
                        </Typography>
                    </Section>
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
                        Monsters
                    </Typography>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            Reading Monster Tables
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Actions determined by rolling a d10.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Example Actions:
                        </Typography>
                        <List>
                            <ListItem>Attack (≥ 6) (Some Monsters have multi-attack to target more than 1 creature)</ListItem>
                            <ListItem>Wind up (≤ 7, doubles the damage of the next attack)</ListItem>
                        </List>
                    </Section>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            Damage
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Monsters have a damage value to determine their damage per hit, usually 1 (or 2 for BOSS monsters).
                        </Typography>
                    </Section>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            Examples of Special Abilities
                        </Typography>
                        <List>
                            <ListItem>Some attacks may negate dodging or bracing.</ListItem>
                            <ListItem>Dragons breath deals damage equal to the monster’s hit points.</ListItem>
                            <ListItem>Special abilities triggered on a 1 (maybe a breath weapon, something that does 3 damage).</ListItem>
                            <ListItem>Other unique abilities specific to each monster.</ListItem>
                        </List>
                    </Section>
                    <Section>
                        <Typography variant="h3" gutterBottom>
                            Explaining Monster Stats
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Monsters have stats to assist in adjudicating spells or other special circumstances.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Monsters all have an Insight requirement, a monster type, a description, and rumors.
                        </Typography>
                    </Section>
                </Paper>
            </Container>

            <HomeButton />
        </>
    );
};

export default RunningTheGame;
