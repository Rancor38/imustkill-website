import Container from '../components/Container';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';

const RunningTheGame = () => {
    return (
        <>
        <Container>
            <h1>Running the Game</h1>
            <h2>The Hunt Outline</h2>
            <p>The following is a section-by-section general outline of how to structure your hunts within the game of I Must Kill. These aren't prescriptive, but are a good jumping off point to build your adventure.</p>
            <Section>
            <h3>The Hook:</h3>
            <p>Players are introduced to the scenario.</p>
            <h3>Negotiate Pay:</h3>
            <p>Test Focus, you bargain for high pay, otherwise you agree to low pay.</p>
            <p>High pay is enough to have spending money later, low pay is enough only for subsistence.</p>
            </Section>
            <Section>
            <h3>The Rumor Phase:</h3>
            <p>Meet someone who can tell you information about the monster. They present rumors for the monster. (Rumors are curated by the GM with true and misleading information about the monster).</p>
            <p>The GM chooses which of these rumors is true in this given scenario.</p>
            </Section>
            <Section>
                <h3>The Research Phase:</h3>
            <p>An old journal, a tale from long ago, an old friend. You reach out to learn information about the monster, and test Fate to learn its weakness (draw a weakness from the Weaknesses deck)</p>
            </Section>
            <Section>
            <h3>Prepare</h3>
            <p>Use the information you’ve learned to procure what you need for the hunt (if reasonably available).</p>
            </Section>
            <Section>
            <h3>Tracking the Monster:</h3>
            <p>Find the monster in its home (test Fate) or it ambushes you.</p>
            </Section>
            <Section>
            <h3>The Fight</h3>
            <p>Battle the monster, win or die.</p>
            </Section>
            <Section>
            <h3>Denouement</h3>
            <p>Collect the bounty</p>
            <p>Replenish equipment up to 10, and if high pay, everyone can purchase new equipment.</p>
            <p>Rest and level up</p>
            </Section>
        </Container>
        <Container>
            <h2>Creatures of False-Eden</h2> 
            <Section>
            <h3>
            Explanation of Hidden Creatures
            </h3>
            <ul>
            <li>Monsters have a rating of Insight required before a hunter can see them as they are. These creatures are metaphysical threats that challenge perception of the physical realm. On the highest end, these creatures target the spirit, a human’s concept of time, and represent the vast and uncaring realms of deep space and sea.</li>
            <li>All monsters that lie beyond a human’s Insight appear as beasts rationalized by the context the human has. They might perceive a werewolf as a large bear, or a changeling as a deformed man.</li>
            </ul>
            </Section>
            <Section>
            <h3>The Downsides of Insight.</h3>
            <p>Having higher insight enables hunters to perceive entities that others cannot. However, exceeding your fellow hunters' insight scores may pose risks. For instance, if a poltergeist requires an insight score of 5, and only your hunter has this much insight, then only your hunter can see it. Without the necessary insight, combatting the poltergeist is impossible. Your hunter's attacks, coupled with their insight, become effective and can deal damage, but this also draws the poltergeist's attention who will target your hunter viciously. Fellow hunters, lacking the required insight, would struggle to assist effectively, resorting to perhaps dragging you out of the poltergeist’s clawing grasp or aiding you with spells, but they cannot perceive or attack the poltergeist.</p>
            </Section>
        </Container>
        <Container>
            <h2>Monsters</h2>
            <Section>
            <h3>Reading Monster Tables:</h3>
            <p>Actions determined by rolling a d10.</p>
            <p>Example Actions:</p>
            <ul>
                <li>Attack (≥ 6) (Some Monsters have multi-attack to target more than 1 creature)</li>
                <li>Wind up (≤ 7, doubles the damage of the next attack)</li>
            </ul>
            </Section>
            <Section>
            <h3>Damage:</h3>
            <p>Monsters have a damage value to determine their damage per hit, usually 1 (or 2 for BOSS monsters).</p>
            </Section>
            <Section>
            <h3>Examples of Special Abilities:</h3>
            <ul>
                <li>Some attacks may negate dodging or bracing.</li>
                <li>Dragons breath deals damage equal to the monster’s hit points.</li>
                <li>Special abilities triggered on a 1 (maybe a breath weapon, something that does 3 damage).</li>
                <li>Other unique abilities specific to each monster.</li>
            </ul>
            </Section>
            <Section>
            <h3>Explaining Monster Stats:</h3>
            <p>Monsters have stats to assist in adjudicating spells or other special circumstances.</p>
            <p>Monsters all have an Insight requirement, a monster type, a description, and rumors.</p>
            </Section>
        </Container>

        <HomeButton/>
        </>
    );
};

export default RunningTheGame;
