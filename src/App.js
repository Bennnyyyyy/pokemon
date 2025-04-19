import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import PokemonList from './components/PokemonList';
import BattleSimulator from './components/BattleSimulator';
import TeamManager from './components/TeamManager';

function App() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      const res1 = await axios.get('https://pokeapi.co/api/v2/pokemon/25'); // Pikachu
      const res2 = await axios.get('https://pokeapi.co/api/v2/pokemon/1');  // Bulbasaur
      setPokemon1(res1.data);
      setPokemon2(res2.data);
    };
    loadPokemon();
  }, []);

  const sectionMotion = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const headerMotion = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const footerMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay: 1.2 },
  };

  return (
    <div className="App">
      <header className="header">
        <motion.h1 {...headerMotion}>
          Pokédex Trainer Dashboard
        </motion.h1>
      </header>

      <main className="main-content">
        <motion.section className="list-section" {...sectionMotion} transition={{ ...sectionMotion.transition, delay: 0.3 }}>
          <motion.div
            key="pokemon-list"
            {...sectionMotion}
            transition={{ ...sectionMotion.transition, delay: 0.5 }}
          >
            <PokemonList />
          </motion.div>
        </motion.section>

        <motion.section className="team-section" {...sectionMotion} transition={{ ...sectionMotion.transition, delay: 0.6 }}>
          <TeamManager />
        </motion.section>

        <motion.section className="battle-section" {...sectionMotion} transition={{ ...sectionMotion.transition, delay: 0.9 }}>
          {pokemon1 && pokemon2 ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.2 }}
              exit={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BattleSimulator pokemon1={pokemon1} pokemon2={pokemon2} />
            </motion.div>
          ) : (
            <p>Loading Pokémon for battle...</p>
          )}
        </motion.section>
      </main>

      <footer className="footer">
        <motion.p {...footerMotion}>
          Built by YOU ⚡ using PokéAPI & json-server
        </motion.p>
      </footer>
    </div>
  );
}

export default App;
