import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonList.css';

const PokemonList = ({ onSelectPokemon }) => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonArray = [];
      for (let i = 1; i <= 20; i++) {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
          pokemonArray.push(response.data);
        } catch (error) {
          console.error(`Error fetching Pokémon #${i}`, error);
        }
      }
      setPokemon(pokemonArray);
    };
    fetchPokemon();
  }, []);

  return (
    <div className="pokemon-list-container">
      <h1>Select Your Pokémon</h1>
      <div className="pokemon-grid">
        {pokemon.map(poke => (
          <div
            className="pokemon-card"
            key={poke.id}
            onClick={() => onSelectPokemon(poke)}
          >
            <img src={poke.sprites.front_default} alt={poke.name} />
            <h3>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h3>
            <div className="stats">
              <p>❤️ HP: {poke.stats[0].base_stat}</p>
              <p>⚔️ Attack: {poke.stats[1].base_stat}</p>
              <p>🛡️ Defense: {poke.stats[2].base_stat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
