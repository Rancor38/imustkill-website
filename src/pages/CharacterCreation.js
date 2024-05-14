import Container from '../components/Container';
import Section from '../components/Section';
import HomeButton from '../components/HomeButton';

const CharacterCreation = () => {
    return (
        <>
        <Container>
            <h1>Character Creation</h1>
            <Section>
            <h3>Stats:</h3>
            <ul>
                <li>Body (Lift, push, climb, drag, grapple, jump, swim)</li>
                <li>Agility (Catch, squeeze, pick lock, escape manacles)</li>
                <li>Focus (Perceive, listen, conjure magic, track prey, control will, resist enchantment)</li>
                <li>Fate (Luck, life force, fortune, death)</li>
            </ul>
            </Section>
            <Section>
            <h3>Rolling for Stats:</h3>
            <ul>
                <li>Roll 4d10s for character creation.</li>
                <li>Assign the values rolled to Body, Agility, Focus, and Fate.</li>
                <li>Maximum stat value is 10, minimum is a 2.</li>
            </ul>
            </Section>
            <Section>
            <h3>Arrays (Alternative Option):</h3>
            <p>Choose from predefined array or roll for stats.</p>
            <p>Arrays:</p>
            <ul>
                <li>6, 6, 6, 6</li>
                <li>4, 4, 8, 8</li>
                <li>3, 4, 8, 9</li>
            </ul>
            </Section>
            <Section>
            <h3>Attack Stat:</h3>
            <ul>
                <li>Choose Body, Agility, or Focus as your attack stat.</li>
                <li>Half of Fate (rounded up) is your hit points.</li>
            </ul>
            </Section>
</Container>
<Container>
            <h2>Equipment</h2>
            <Section>
            <h3>Random Start</h3>
            <p>Draw 10 equipment cards from the Starter Deck per player at the table, and each player can choose up to 10 from the whole lot.</p>
            <h3>Fixed Start</h3>
            <p>Choose 10 cards from your character deck to outfit your hunter.</p>
            </Section>
</Container>
<Container>
            <h2>Adventuring Assumptions</h2>
            <Section>
            <p>Your character is competent, and capable of taking care of themselves under normal circumstances. Does your character have bandages to bind small wounds? This can be assumed. Do you have water at your camp? Probably. Do you have food? Most likely. Unless the GM tells you of some extenuating circumstances that might prevent your character from having their basic needs met they are assumed to be met.</p>
            <p>Equipment gained from equipment packs are not assumed to be an exhaustive list of all of the equipment on your person but are a few key items. Items beyond these can be discussed and requested from the GM to their discretion in line with what is reasonable.</p>
            <p>Likewise, money is to be kept in general terms. You either have enough money, or you do not. High pay is enough to pick up a few things of value or take some weeks (or months) off work before the next hunt. You otherwise have enough money for yourselves with little generosity.</p>
            </Section>

        </Container>
        <HomeButton/>
        </>
    );
};

export default CharacterCreation;
