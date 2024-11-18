import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import FlashyMenu from '../components/FlashyMenu';

const HomePage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        color: '#e0e0e0',
        padding: 0,
      }}
    >
      <header
        style={{
          textAlign: 'center',
          padding: '20px 0',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          I Must Kill
        </Typography>
        <Typography variant="h3" component="h3">
          The hunt awaits you...
        </Typography>
      </header>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          gap: 2, // Space out the buttons more
        }}
      >
        <FlashyMenu
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2, // Space out the buttons more
          }}
        >
          <Button
            component={Link}
            to="/character-creation"
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
              marginBottom: '10px', // Padding between buttons
              '&:hover': {
                bgcolor: '#e0e0e0',
                transform: 'scale(1.05) translateX(10px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Character Creation
          </Button>
          <Button
            component={Link}
            to="/character-sheet"
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
              marginBottom: '10px', // Padding between buttons
              '&:hover': {
                bgcolor: '#e0e0e0',
                transform: 'scale(1.05) translateX(10px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Character Sheet
          </Button>
          <Button
            component={Link}
            to="/equipment"
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
              marginBottom: '10px', // Padding between buttons
              '&:hover': {
                bgcolor: '#e0e0e0',
                transform: 'scale(1.05) translateX(10px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Equipment Deck
          </Button>
          <Button
            component={Link}
            to="/combat-mechanics"
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
              marginBottom: '10px', // Padding between buttons
              '&:hover': {
                bgcolor: '#e0e0e0',
                transform: 'scale(1.05) translateX(10px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Combat Mechanics
          </Button>
          <Button
            component={Link}
            to="/death-and-resting"
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
              marginBottom: '10px', // Padding between buttons
              '&:hover': {
                bgcolor: '#e0e0e0',
                transform: 'scale(1.05) translateX(10px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Death and Resting
          </Button>
          <Button
            component={Link}
            to="/progression"
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
              marginBottom: '10px', // Padding between buttons
              '&:hover': {
                bgcolor: '#e0e0e0',
                transform: 'scale(1.05) translateX(10px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Progression
          </Button>
          <Button
            component={Link}
            to="/spellcasting"
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
              marginBottom: '10px', // Padding between buttons
              '&:hover': {
                bgcolor: '#e0e0e0',
                transform: 'scale(1.05) translateX(10px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Spellcasting
          </Button>
          <Button
            component={Link}
            to="/spells"
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
              marginBottom: '10px', // Padding between buttons
              '&:hover': {
                bgcolor: '#e0e0e0',
                transform: 'scale(1.05) translateX(10px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Spells
          </Button>
          <Button
  component={Link}
  to="/running-the-game"
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
    marginBottom: '10px', // Padding between buttons
    textAlign: 'center', // Center the text
    '&:hover': {
      bgcolor: '#e0e0e0',
      transform: 'scale(1.05) translateX(10px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
    },
  }}
>
  Running the Game
  <br />
  (GM's Only)
</Button>
          <Button
            component={Link}
            to="/monsters"
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
              marginBottom: '10px', // Padding between buttons
              '&:hover': {
                bgcolor: '#e0e0e0',
                transform: 'scale(1.05) translateX(10px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            Monsters <br /> (GM's Only)
          </Button>
        </FlashyMenu>
      </Box>

      <footer
        style={{
          textAlign: 'center',
          padding: '20px 0',
          bgcolor: '#1f1f1f',
        }}
      >
        <Typography variant="body2">
          &copy; 2024 I Must Kill. All rights reserved.
        </Typography>
      </footer>
    </Container>
  );
};

export default HomePage;
