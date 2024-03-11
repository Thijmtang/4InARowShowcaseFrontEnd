import '../assets/GameBoard4InARow.scss';


import React, { useEffect, useState } from 'react'
import GameBoardCell from '../components/4InARow/GameBoardCell';
import PlayerBadge from '../components/4InARow/PlayerBadge';
import {Player} from '../lib/interfaces/Player';
import { BoardCell } from '../lib/interfaces/BoardCell';
import { toast } from 'react-toastify';
import { useAuth } from '../lib/context/AuthContext';


function GameBoard4InARow() {
  const { user, isLoggedIn} = useAuth();
  console.log(user, isLoggedIn);
  
  // @todo update realtime
  const [currentPlayer, setCurrentPlayer] = useState<Player>({playerNumber: 1, username: "Speler"});

  const [field, setField] = useState<BoardCell[]>();

  useEffect(() => {
    getGameField();
  }, []);

  const rows: JSX.Element[] = [];
  
  field?.forEach((column, i) => {
    const animation = column?.new === true;
    rows.push(<GameBoardCell key={i}  animation={animation} cell={column} updateField={setField}/>);
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

async function getGameField() {
  const response = await fetch('weatherforecast');
  const data = await response.json();
  setField(data);}
}


export default GameBoard4InARow