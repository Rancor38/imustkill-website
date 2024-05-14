import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
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
    <Container>
      <h1>Monsters</h1>
      <Section>
        <h2>A-Z</h2>
      <div className='monster-listinator'>
        {monstersData.map((monster, index) => (
            <Link to={`/monsters/${monster.Name}`} key={index}>{monster.Name}</Link>
        ))}
      </div>
        </Section>
        </Container>
            <HomeButton/>
    </>
  );
};

export default Monsters;
