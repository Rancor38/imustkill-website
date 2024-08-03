import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, List, ListItem } from '@mui/material';
import HomeButton from '../components/HomeButton';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [randomEquipment, setRandomEquipment] = useState([]);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await fetch('/equipment.json');
                const data = await response.json();
                setEquipment(data.equipment);
            } catch (error) {
                console.error('Error fetching equipment data:', error);
            }
        };

        fetchEquipment();
    }, []);

    function pickRandomItems(array) {
        const newArray = [];
        const arrayLength = array.length;
    
        // Shuffle the array
        for (let i = arrayLength - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    
        // Pick the first 10 elements (or less if array length is less than 10)
        const numToPick = Math.min(10, arrayLength);
        for (let i = 0; i < numToPick; i++) {
            newArray.push(array[i]);
        }
    
        setRandomEquipment(newArray);
    }

    return (
        <>
            <Container
                sx={{
                    bgcolor: '#121212',
                    color: '#e0e0e0',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h1" gutterBottom>
                    Equipment
                </Typography>
                <Typography variant="h3" gutterBottom>
                    Hunters start with 10 random items...
                </Typography>

                <Paper
                    sx={{
                        bgcolor: '#1f1f1f',
                        padding: '20px',
                        width: '100%',
                        maxWidth: '800px',
                        marginBottom: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#333',
                            color: '#e0e0e0',
                            '&:hover': {
                                bgcolor: '#444',
                            },
                        }}
                        onClick={() => pickRandomItems(equipment)}
                    >
                        Give me 10 items
                    </Button>
                    <List>
                        {randomEquipment.map((item, index) => (
                            <ListItem key={index}>
                                <Typography variant="body1">
                                    <strong>{item.name}.</strong> {item.description}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
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
                        Full Item List:
                    </Typography>
                    <List>
                        {equipment.map((item, index) => (
                            <ListItem key={index}>
                                <Typography variant="body1">
                                    <strong>{item.name}.</strong> {item.description}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>

            <HomeButton />
        </>
    );
};

export default Equipment;
