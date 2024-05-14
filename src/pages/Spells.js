import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';

const Spells = () => {
    const [spells, setSpells] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const response = await fetch('/spells.json');
                const data = await response.json();
                setSpells(data.spells);
            } catch (error) {
                console.error('Error fetching spells data:', error);
            }
        };

        fetchSpells();
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredSpells = spells.filter(spell =>
        spell.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Container>
                <h1>Spells</h1>
                <input
                    type="text"
                    placeholder="Search spells..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <ul>
                    {filteredSpells.map((spell, index) => (
                        <Section key={index}>
                            <li>
                                <h2>{spell.name}</h2>
                                <p><strong>Rarity:</strong> {spell.rarity}</p>
                                <p>{spell.description}</p>
                            </li>
                        </Section>
                    ))}
                </ul>
            </Container>
            <HomeButton />
        </>
    );
};

export default Spells;
