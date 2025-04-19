import React, { useState, useEffect } from 'react';
import '../style/BattleSimulator.css';

const BattleSimulator = ({ playerPokemon, opponentPokemon }) => {
  const [winner, setWinner] = useState('');
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [battleStage, setBattleStage] = useState('idle'); // idle, attacking, result
  const [exploded, setExploded] = useState('');

  useEffect(() => {
    if (
      !playerPokemon || !opponentPokemon ||
      !playerPokemon.stats || !opponentPokemon.stats ||
      playerPokemon.stats.length < 6 || opponentPokemon.stats.length < 6
    ) return;

    setBattleStage('attacking');

    const playerStats = {
      hp: playerPokemon.stats[0].base_stat,
      attack: playerPokemon.stats[1].base_stat,
      speed: playerPokemon.stats[5].base_stat,
    };

    const opponentStats = {
      hp: opponentPokemon.stats[0].base_stat,
      attack: opponentPokemon.stats[1].base_stat,
      speed: opponentPokemon.stats[5].base_stat,
    };

    let playerScore = 0;
    let opponentScore = 0;

    if (playerStats.hp > opponentStats.hp) playerScore++; else if (opponentStats.hp > playerStats.hp) opponentScore++;
    if (playerStats.attack > opponentStats.attack) playerScore++; else if (opponentStats.attack > playerStats.attack) opponentScore++;
    if (playerStats.speed > opponentStats.speed) playerScore++; else if (opponentStats.speed > playerStats.speed) opponentScore++;

    setTimeout(() => {
      // Decrease HP for battle simulation
      setPlayerHP(Math.max(0, playerHP - 10));
      setOpponentHP(Math.max(0, opponentHP - 10));
    }, 1000);

    setTimeout(() => {
      if (playerScore > opponentScore) {
        setWinner(`${playerPokemon.name.toUpperCase()} Wins!`);
        setExploded('opponent');
      } else if (opponentScore > playerScore) {
        setWinner(`${opponentPokemon.name.toUpperCase()} Wins!`);
        setExploded('player');
      } else {
        setWinner("It's a Tie!");
      }
      setBattleStage('result');
    }, 2500);

  }, [playerPokemon, opponentPokemon]);

  if (!playerPokemon || !opponentPokemon) {
    return <h2>Loading battle data...</h2>;
  }

  return (
    <div className="battle-container">
      <h1>⚔️ Battle Arena ⚔️</h1>
      <div className="battle-cards">
        <div className={`pokemon-card ${battleStage === 'attacking' ? 'attack' : ''} ${exploded === 'player' ? 'explode' : ''}`}>
          <h3>You</h3>
          <img src={playerPokemon.sprites.front_default} alt={playerPokemon.name} />
          <p>{playerPokemon.name.toUpperCase()}</p>
          <div className="hp-bar">
            <div className="hp-bar-inner" style={{ width: `${playerHP}%` }}></div>
          </div>
        </div>

        <div className={`pokemon-card ${battleStage === 'attacking' ? 'attack' : ''} ${exploded === 'opponent' ? 'explode' : ''}`}>
          <h3>Opponent</h3>
          <img src={opponentPokemon.sprites.front_default} alt={opponentPokemon.name} />
          <p>{opponentPokemon.name.toUpperCase()}</p>
          <div className="hp-bar">
            <div className="hp-bar-inner" style={{ width: `${opponentHP}%` }}></div>
          </div>
        </div>
      </div>
      {winner && <h2>🏆 {winner} 🏆</h2>}
    </div>
  );
};

export default BattleSimulator;
