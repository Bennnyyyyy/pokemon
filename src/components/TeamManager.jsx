import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeamManager.css';  // Importing custom CSS file for styling

const TeamManager = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [team, setTeam] = useState([]);

  // Fetching Pokémon list from the API
  useEffect(() => {
    const fetchPokemon = async () => {
      const list = [];
      for (let i = 1; i <= 20; i++) {
        try {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
          list.push(res.data);
        } catch (error) {
          console.error(`Error fetching Pokemon #${i}`, error);
        }
      }
      setPokemonList(list);
    };
    fetchPokemon();
  }, []);

  // Loading saved team from local server
  useEffect(() => {
    const loadTeam = async () => {
      try {
        const response = await axios.get('http://localhost:3001/team');
        setTeam(response.data);
      } catch (error) {
        console.error("Error loading team from server", error);
      }
    };
    loadTeam();
  }, []);

  // Add a Pokémon to the team
  const addToTeam = async (pokemon) => {
    if (team.length >= 6) {
      alert("Team is full! Max 6 Pokémon.");
      return;
    }
    const exists = team.some(member => member.id === pokemon.id);
    if (exists) {
      alert(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} is already in your team!`);
      return;
    }

    try {
      await axios.post('http://localhost:3001/team', {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default, // Add image to the team
      });
      setTeam(prev => [...prev, { id: pokemon.id, name: pokemon.name, image: pokemon.sprites.front_default }]);
    } catch (error) {
      console.error("Error saving to team", error);
    }
  };

  // Remove a Pokémon from the team
  const removeFromTeam = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/team/${id}`);
      setTeam(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error removing from team", error);
    }
  };

  return (
    <div className="team-container">
      <h2>Pick Your Pokémon Team</h2>
      
      {/* Pokémon list to choose from */}
      <div className="pokemon-list">
        {pokemonList.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            <h4>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h4>
            <button onClick={() => addToTeam(pokemon)} className="add-btn">Add to Team</button>
          </div>
        ))}
      </div>

      {/* Displaying the current team */}
      <h3>Your Current Team ({team.length}/6)</h3>
      <ul className="team-list">
        {team.map(member => (
          <li key={member.id} className="team-member">
            <img src={member.image} alt={member.name} className="team-member-image" />
            {member.name}
            <button 
              className="remove-btn"
              onClick={() => removeFromTeam(member.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManager;
