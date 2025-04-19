// src/components/PokemonCard.js
import React from 'react';
import './PokemonCard.css';

function PokemonCard({ name, hp, type, image, attack }) {
  return (
    <div className={`pokemon-card ${type}`}>
      <img src={image} alt={name} className="pokemon-image" />
      <h2>{name}</h2>
      <p>HP: {hp}</p>
      <p>Type: {type}</p>
      <p>Attack: {attack}</p>
    </div>
  );
}

export default PokemonCard;
