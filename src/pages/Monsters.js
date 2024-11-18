import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Paper, Grid } from '@mui/material';
import HomeButton from '../components/HomeButton';
import Section from '../components/Section';

const Monsters = () => {
    const [monstersData, setMonstersData] = useState([]);

    useEffect(() => {
        const fetchMonstersData = async () => {
            try {
                const response = await fetch('/monsters.json');
                const data = await response.json();
                setMonstersData(data);
            } catch (error) {
                console.error('Error fetching monsters data:', error);
            }
        };

        fetchMonstersData();
    }, []);

    return (
        <>
            <Container
                sx={{
                    bgcolor: '#121212',
                    color: '#e0e0e0',
                    padding: '20px',
                    display: 'flex',
                    paddingBottom: '100px', // Adjust this value as needed
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h1" gutterBottom>
                    Monsters
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
                    <Section>
                        <Typography variant="h2" gutterBottom>
                            A-Z
                        </Typography>
                        <div className="monster-listinator" style={{ marginTop: '20px' }}>
                            {monstersData.map((monster, index) => (
                                <Link
                                    to={`/monsters/${monster.Name}`}
                                    key={index}
                                    style={{
                                        display: 'block',
                                        color: '#e0e0e0',
                                        textDecoration: 'none',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        transition: 'background-color 0.3s, color 0.3s',
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.backgroundColor = '#333';
                                        e.target.style.color = '#fff';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = '#e0e0e0';
                                    }}
                                >
                                    {monster.Name}
                                </Link>
                            ))}
                        </div>
                    </Section>
                </Paper>
            </Container>

            <HomeButton />
        </>
    );
};

export default Monsters;
