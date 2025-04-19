import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import PokemonList from './components/PokemonList';
import BattleSimulator from './components/BattleSimulator';
import './App.css';

function App() {
  const [stage, setStage] = useState('landing');
  const [playerPokemon, setPlayerPokemon] = useState(null);

  const handleBegin = () => setStage('select');
  const handlePokemonSelect = (pokemon) => {
    setPlayerPokemon(pokemon);
    setStage('battle');
  };

  return (
    <div className="App">
      {stage === 'landing' && <LandingPage onBegin={handleBegin} />}
      {stage === 'select' && <PokemonList onSelectPokemon={handlePokemonSelect} />}
      {stage === 'battle' && playerPokemon && (
        <BattleSimulator 
          playerPokemon={playerPokemon}
          opponentPokemon={{
            name: 'Charizard',
            sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
            stats: [{ base_stat: 78 }, { base_stat: 84 }, { base_stat: 78 }]
          }}
        />
      )}
    </div>
  );
}

export default App;
