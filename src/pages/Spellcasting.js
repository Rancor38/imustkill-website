import Container from '../components/Container';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';

const Spellcasting = () => {
    return (
        <>
        <Container>
            <h1>Spellcasting</h1>
            <Section>
            <p>Test focus to gather a spell, if you succeed you can draw a spell card from your spell deck, and keep this card until your next night’s rest.</p>
            <p>You can only have 3 spells gathered at one time.</p>
            <p>You can play spell cards at any time triggering their effect. Follow the instructions on the spell card.</p>
            <p>You cannot target something with a spell if you cannot perceive it, although you might still be able to harm it.</p>
            <p>You cannot select a target without a clear unbroken line from you to the location of it.</p>
            <p>Discarded spells can be returned to your spell deck when you complete a night’s rest.</p>
            </Section>
        </Container>

        <HomeButton/>
        </>
    );
};

export default Spellcasting;
