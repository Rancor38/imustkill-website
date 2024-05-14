import Container from '../components/Container';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';

const CombatMechanics = () => {
    return (
        <>
        <Container>
            <h1>Combat Mechanics</h1>
            <Section>
            <h3>Turns:</h3>
            <ul>
                <li>Players and monsters act simultaneously.</li>
                <li>GM rolls for the monster's action.</li>
            </ul>
            </Section>
            <Section>

            <h3>Actions (In Combat):</h3>
            <ul>
                <li>Attack</li>
                <li>Dodge</li>
                <li>Brace</li>
                <li>Cast a Spell</li>
            </ul>
            </Section>
            <Section>

            <h3>Attack:</h3>
            <ul>
                <li>Roll 1d10 against Attack Stat.</li>
                <li>If the roll is lower, deal 1 damage (2 for a natural 1, aka a crit).</li>
            </ul>
            </Section>
            <Section>

            <h3>Dodge:</h3>
            <ul>
                <li>Roll 1d10 against Agility.</li>
                <li>If the roll is lower, immune to attacks until next turn.</li>
            </ul>
            </Section>
            <Section>

            <h3>Brace:</h3>
            <ul>
                <li>Roll 1d10 against Body.</li>
                <li>If the roll is lower and you have a weapon, armor, or shield, you are immune to attacks until next turn.</li>
            </ul>
            </Section>
            <Section>

            <h3>Gather a Spell:</h3>
            <ul>
                <li>Roll 1d10 against Focus.</li>
                <li>If the roll is lower, draw 1 spell from your spell deck.</li>
                <li>If you roll a 10 you lose 1 hit point, and discard all held spell cards.</li>
            </ul>
            </Section>
        </Container>
<Container>
            <h2>Weapons</h2>
            <Section>

            <p>Weapons do not have extensive effects on combat.</p>
            <p>Two-weapons, polearms, and ranged weapons let you roll 2d10s when attacking, and choose the lower.</p>
            </Section>

            <h2>Shields & Armor</h2>
            <Section>
            <h3>Shield:</h3>
            <p>Roll an additional d10 when bracing, choose the lower.</p>
            </Section>
            <Section>
            <h3>Armor:</h3>
            <p>Roll an additional d10 when bracing, choose the lower.</p>
            </Section>
            <Section>
            <h3>No Armor:</h3>
            <p>Roll 2d10s when dodging, choose the lower.</p>
            </Section>
</Container>
<Container>
            <h2>Status's</h2>
            <Section>
            <h3>Unconscious</h3>
            <p>A creature cannot defend against an attack, or make attacks, or move. Attacks against an unconscious creature automatically succeed. Creatures that survive an attack while unconscious may awaken at the start of their next turn.</p>
            </Section>
</Container>
            <HomeButton/>
        </>
    );
};

export default CombatMechanics;
