import React, { useState } from 'react';

const BattleSimulator = ({ pokemon1, pokemon2 }) => {
  const [winner, setWinner] = useState("");

  const handleBattle = () => {
    let score1 = 0;
    let score2 = 0;

    const stats = ["hp", "attack", "speed"];
    const poke1Stats = {
      hp: pokemon1.stats[0].base_stat,
      attack: pokemon1.stats[1].base_stat,
      speed: pokemon1.stats[5].base_stat,
    };
    const poke2Stats = {
      hp: pokemon2.stats[0].base_stat,
      attack: pokemon2.stats[1].base_stat,
      speed: pokemon2.stats[5].base_stat,
    };

    stats.forEach(stat => {
      if (poke1Stats[stat] > poke2Stats[stat]) score1++;
      else if (poke1Stats[stat] < poke2Stats[stat]) score2++;
    });

    if (score1 > score2) {
      setWinner(`${pokemon1.name} Wins!`);
    } else if (score2 > score1) {
      setWinner(`${pokemon2.name} Wins!`);
    } else {
      setWinner("It's a Tie!");
    }
  };

  return (
    <div>
      <h2>Battle Simulator</h2>
      <p>{pokemon1.name} VS {pokemon2.name}</p>
      <button onClick={handleBattle}>Start Battle</button>
      {winner && <h3>{winner}</h3>}
    </div>
  );
};

export default BattleSimulator;
