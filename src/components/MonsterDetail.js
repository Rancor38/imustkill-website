import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import HomeButton from './HomeButton';


const MonsterDetail = () => {

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

  const { name } = useParams();
  const monster = monstersData.find(monster => monster.Name === name);

  if (!monster) {
    return <div>Monster not found</div>;
  }

  return (
    <div>
      <h2>{monster.Name}</h2>
      <p>{monster.Description}</p>
      <table>
        <tbody>
          <tr>
            <td>Actions:</td>
            <td>{monster.Actions}</td>
          </tr>
          <tr>
            <td>Damage:</td>
            <td>{monster.Damage}</td>
          </tr>
          <tr>
            <td>Special Abilities:</td>
            <td>{monster['Special Abilities']}</td>
          </tr>
          <tr>
            <td>Body:</td>
            <td>{monster.Body}</td>
          </tr>
          <tr>
            <td>Agility:</td>
            <td>{monster.Agility}</td>
          </tr>
          <tr>
            <td>Focus:</td>
            <td>{monster.Focus}</td>
          </tr>
          <tr>
            <td>Fate:</td>
            <td>{monster.Fate}</td>
          </tr>
          <tr>
            <td>Insight:</td>
            <td>{monster.Insight}</td>
          </tr>
        </tbody>
      </table>
      <Link to="/monsters">Go back to Monsters</Link>
      <HomeButton/>
    </div>
  );
};

export default MonsterDetail;
