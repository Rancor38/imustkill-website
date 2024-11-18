import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, TextField, List, ListItem } from '@mui/material';
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
                    Spells
                </Typography>

                <TextField
                    variant="outlined"
                    placeholder="Search spells..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    sx={{
                        bgcolor: '#1f1f1f',
                        borderRadius: '4px',
                        width: '100%',
                        maxWidth: '800px',
                        marginBottom: '20px',
                        input: {
                            color: '#e0e0e0',
                        },
                        fieldset: {
                            borderColor: '#333',
                        }
                    }}
                />

                <List
                    sx={{
                        width: '100%',
                        maxWidth: '800px',
                        bgcolor: '#1f1f1f',
                        borderRadius: '4px',
                        padding: '10px',
                    }}
                >
                    {filteredSpells.map((spell, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                borderBottom: '1px solid #333',
                                padding: '10px',
                                '&:last-child': {
                                    borderBottom: 'none',
                                },
                            }}
                        >
                            <Section
                                sx={{
                                    width: '100%',
                                    padding: '20px',
                                }}
                            >
                                <Typography variant="h2" gutterBottom>
                                    {spell.name}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    <strong>Rarity:</strong> {spell.rarity}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {spell.description}
                                </Typography>
                            </Section>
                        </ListItem>
                    ))}
                </List>
            </Container>

            <HomeButton />
        </>
    );
};

export default Spells;
