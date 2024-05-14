import Container from '../components/Container';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';

const Progression = () => {
    return (
        <>
        <Container>
            <h1>Progression</h1>
            <Section>
            <h2>Leveling Up</h2>
            <p><strong>You level up after you survive a Fight and rest, you can then:</strong></p>
            <ul>
                <li>Roll 1d10 against 1 chosen stat.</li>
                <li>If the roll is lower, increase the stat by 1 (max 10).</li>
            </ul>
            <p>Or you can:</p>
            <ul>
                <li>Gain Insight. Insight is a resource you can gather that provides benefits while also subjecting you to higher levels of challenge (see <strong>Insight</strong>).</li>
            </ul>
            </Section>
            <Section>
            <h2>Insight</h2>
            <p>A character with Insight gains the ability to reroll any tests they make during a given day a number of times equal to their quantity of Insight. These rerolls are available again after a Night’s Rest.</p>
            <p>Insight allows a hunter to see hidden creatures, lights, and objects, learn more about the nature of the cosmos, and see threats to mankind that would otherwise remain hidden.</p>
            <p>Insight is capped at 10, at this point your hunter is considered <strong>ascendant</strong>.</p>
            </Section>
            <Section>
            <h2>Ascendant</h2>
            <p>When you reach the point of Hunter Ascendant, you are granted an audience with the Old Man or Ancient Mistress, and may make a wish for a price of all 10 insight points.</p>
            <p>A wish can be for anything that complies with the following limitations, but otherwise will be administered fairly within the wisher's intentions, avoiding monkey’s paws and verbal gotchas:</p>
            <ul>
                <li><strong>Time Manipulation:</strong> Wishes cannot alter the flow of time, as this could have catastrophic consequences on the fabric of reality.</li>
                <li><strong>Limited Scope:</strong> Wishes cannot alter certain fundamental aspects of reality, such as the laws of physics or the nature of existence.</li>
                <li><strong>No Interference with Free Will:</strong> Wishes cannot be used to directly control or manipulate the actions of others, ensuring that individuals retain their autonomy.</li>
                <li><strong>No Unlimited Power:</strong> Wishes cannot grant the wisher unlimited power or omnipotence.</li>
                <li><strong>Limited Knowledge:</strong> Characters may not fully understand the consequences of their wishes or the true nature of the wish-granting entity, leading to unforeseen complications.</li>
                <li><strong>Consequences for Selfish Wishes:</strong> Selfish or malicious wishes may come with unintended consequences or backlash.</li>
            </ul>
            </Section>
        </Container>

<HomeButton/>
        </>
    );
};

export default Progression;
