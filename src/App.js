import './App.css';
import React, {useState} from 'react';

function App() {

  const [appState, setAppState] = useState({monster: {}})

  const getMonster = async () => {
    const monsterListResponse = await fetch(`https://www.dnd5eapi.co/api/monsters/`)
    const monsterListData = await monsterListResponse.json()
    let selected = monsterListData.results[Math.floor(Math.random()*monsterListData.results.length)].index;
    const monsterResponse = await fetch(`https://www.dnd5eapi.co/api/monsters/${selected}`);
    const monsterData = await monsterResponse.json()
    appState.monster = monsterData;
    setAppState({...appState});
    console.log(monsterData);
  }

  const stats = ['Hit Points','Hit Dice','Challenge Rating','Armor Class', 'Size'];
  const abilityScores = ['Strength','Dexterity','Constitution','Intelligence','Wisdom','Charisma'];
  const statBlocks = [stats, abilityScores];
  const properties = ['Special Abilities', 'Actions'];

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => {getMonster()}}>Summon a Monster!</button>
        {appState.monster.strength !== undefined &&
          <section className='stats'>
            <h2>{appState.monster.name}</h2>
            {statBlocks.map((block, index) => {
              return <section key={index} className='statblock'>
                {block.map((stat, index) => {
                  return <span key={index}>{stat}: {appState.monster[stat.replace(" ", "_").toLowerCase()]}&nbsp;&nbsp;&nbsp;</span>
                })}
              </section>
            })}
            <p>{appState.monster.desc}</p>
            {properties.map((property, index) => {
              return <section key={index}>
                <h3>{property}</h3>
                <section>
                  {appState.monster[property.replace(" ","_").toLowerCase()].map((property, index) => {
                    return <div key={index}><b>{property.name}</b>: {property.desc}</div>
                  })}
                </section>
              </section>
            })}
          </section>
        }
      </header>
    </div>
  );
}

export default App;
