import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import Section from '../components/Section';
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
        <Container>
            <h1>Equipment</h1>
            <h3>
            Hunters start with 10 random items...
            </h3>
            <Section>
                <button onClick={() => pickRandomItems(equipment)}>Give me 10 items</button>
                <ol>
                {randomEquipment.map((item, index) => (
                    <li key={index}>
                        <p><strong>{item.name}.</strong> {item.description}</p>
                    </li>
                ))}
            </ol>
            </Section>
            <Section>
            <h2>Full Item List:</h2>
            <ul>
                {equipment.map((item, index) => (
                    <li key={index}>
                        <p><strong>{item.name}.</strong> {item.description}</p>
                    </li>
                ))}
            </ul>
                </Section>



        </Container>
        <HomeButton/>
            </>
    );
};

export default Equipment;
