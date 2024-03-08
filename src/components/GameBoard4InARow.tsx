import '../assets/GameBoard4InARow.scss';

import React, { useState } from 'react'
import GameBoardCell from '../components/GameBoardCell';
import PlayerBadge from './PlayerBadge';
import {JsonObject} from '../interfaces/JsonObject';
import {Player} from '../interfaces/Player';


function GameBoard4InARow() {
  // @todo update realtime
  const [currentPlayer, setCurrentPlayer] = useState<Player>({playerNumber: 2, username: "Bert jan"});
    
  const field: JsonObject[] = [
    {value: 1, }, {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
    {value: 0}, {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
    {value: 0}, {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
    {value: 0}, {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
    {value: 1, new: true}, {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
    {value: 2}, {value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
    {value: 1}, {value: 1},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},
    {value: 1}, {value: 2},{value: 0},{value: 0},{value: 0},{value: 0},{value: 0},{value: 1, new: true},
  ];

  const rows: JSX.Element[] = [];
  
  field.map((column, i) => {
    let animation = column?.new === true;
    rows.push(<GameBoardCell key={i} player={column.value} animation={animation}/>);
  });

  // for (let i = 0; i < 64; i++) {
      // note: we are adding a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      // rows.push(<GameBoardCell key={i}/>);
  // }

  return (
    <div className="board-container">
      <div className="header">
        <div>
        <h1>
          <b>Huidige beurt</b> <PlayerBadge playerType={currentPlayer?.playerNumber}>{currentPlayer?.username}</PlayerBadge> 
        </h1>
        </div>
      </div>
      <div className='board'>
        {rows}
      </div>
    </div>
 
  );
}

export default GameBoard4InARow