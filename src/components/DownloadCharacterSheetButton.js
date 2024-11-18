import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';

const DownloadCharacterSheetButton = () => {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: '30px', // Adjust padding from the bottom
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000, // Ensures it stays on top
                padding: '0 20px',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'row', // Align items side by side
                    gap: 2, // Space between buttons
                    justifyContent: 'center', // Center buttons horizontally
                    padding: '10px',
                }}
            >
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={{
                        width: 'auto',
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
                        textTransform: 'none',
                    }}
                >
                    Go to Home
                </Button>
                <Button
                    component="a"
                    href={`${process.env.PUBLIC_URL}/IMK Character Sheet.pdf`}
                    download
                    variant="contained"
                    sx={{
                        width: 'auto',
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
                        textTransform: 'none',
                    }}
                >
                    Download PDF
                </Button>
            </Container>
        </div>
    );
};

export default DownloadCharacterSheetButton;
