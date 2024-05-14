import Container from '../components/Container';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';

const DeathAndResting = () => {
    return (
        <>
        <Container>
            <h1>Death and Resting</h1>
        <Section>
            <h2>Death</h2>
            <p>When you reach 0 hit points, test Fate. On a success you live with 1 hit point.</p>
        </Section>
        <Section>
            <h2>Grit Teeth</h2>
            <p>Once per night’s rest you can regain 1 hit point during a 1-minute respite from combat.</p>
        </Section>
        <Section>
            <h2>Night’s Rest</h2>
            <p>A comfortable place to sleep at an inn, a farmer’s house, or beside your campfire for the night. As long as you rest for 8 hours, and sleep for at least 6 of those, you regain all hit points.</p>
        </Section>
        <Section>
            <h2>Dead</h2>
            <p>When a character dies you aren't out of the game. The dead can still take turns in combat, and aid the fate of their companions.</p>
            <p>Once dead, you can choose to strike a feature from your character's sheet and add that value to a living player character of your choice. These abilities last until the start of the selected character’s next turn.</p>
            <p>Once dead, you can choose to strike a feature from your characters sheet and guarantee a crit success based on that attribute to a living player character of your choice. These abilities last until the start of the selected character’s next turn.</p>
            <p>For example, you can choose to strike off your late character’s body score, and replace a living character’s tests with their Body score with a 1 until the start of their next turn.</p>
            <p>You can cross out Body, Agility, Focus, and Fate in this way. Additionally, you can give up each insight token and provide a living character a reroll on any test, before discarding the token.</p>
            <p>You can do these things at any time, even in response to a monster attack or a PC missing an attack, etc. to attempt to change the result.</p>
            <p>Once all abilities and insight are stricken from your character, they have reached their final death, and may finally rest in peace.</p>
        </Section>
        </Container>

            <HomeButton/>
        </>
    );
};

export default DeathAndResting;
