import { Link } from 'react-router-dom';
import Container from '../components/Container';
import FlashyMenu from '../components/FlashyMenu';

const HomePage = () => {
  return (
    <Container className="home-page">
      <header>
        <h1>I Must Kill</h1>
        <h3>The hunt awaits you...</h3>
      </header>
      <Container>
        <FlashyMenu>
            <Link to="/character-creation">Character Creation</Link>
            <Link to="/character-sheet">Character Sheet</Link>
            <Link to="/equipment">Equipment</Link>
            <Link to="/combat-mechanics">Combat Mechanics</Link>
            <Link to="/death-and-resting">Death and Resting</Link>
            <Link to="/progression">Progression</Link>
            <Link to="/spellcasting">Spellcasting</Link>
            <Link to="/spells">Spells</Link>
            <Link to="/running-the-game">Running the Game (GM's Only)</Link>
            <Link to="/monsters">Monsters (GM's Only)</Link>
          {/* Add more navigation links as needed */}
        </FlashyMenu>
      </Container>
      <footer>
        <p>&copy; 2024 I Must Kill. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default HomePage;
