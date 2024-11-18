import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';

const HomeButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Check if the user has scrolled near the bottom
            if (documentHeight - scrollY - windowHeight <= 60) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Add a delay of 1 second before checking scroll position
        const timeoutId = setTimeout(() => {
            handleScroll(); // Check visibility on initial load after delay
            window.addEventListener('scroll', handleScroll);
        }, 300); // 300 milliseconds delay

        // Cleanup the event listener on component unmount
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: isVisible ? '30px' : '-100px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                padding: '0 20px',
                transition: 'bottom 0.3s ease',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
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
                        textTransform: 'none',
                    }}
                >
                    Go to Home
                </Button>
            </Container>
        </div>
    );
};

export default HomeButton;
