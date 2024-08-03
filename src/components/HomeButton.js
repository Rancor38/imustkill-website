import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';

const HomeButton = () => {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: '30px', // Increased padding from the bottom
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000, // Ensures the button is always on top
                padding: '0 20px',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px', // Ensure it has enough space around it
                }}
            >
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={{
                        width: '100%',
                        maxWidth: '300px',
                        height: '60px',
                        fontSize: '18px',
                        bgcolor: '#ffffff',
                        color: '#000000',
                        border: '2px solid #ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            bgcolor: '#e0e0e0',
                            transform: 'scale(1.05) translateX(10px)',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
                        },
                        textTransform: 'none', // Matches the link style in HomePage
                    }}
                >
                    Go to Home
                </Button>
            </Container>
        </div>
    );
};

export default HomeButton;
