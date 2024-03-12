import '../assets/GameBoard4InARow.scss';


import React, { useEffect, useState } from 'react'
import GameBoardCell from '../components/4InARow/GameBoardCell';
import PlayerBadge from '../components/4InARow/PlayerBadge';
import {Player} from '../lib/interfaces/Player';
import { BoardCell } from '../lib/interfaces/BoardCell';
import { toast } from 'react-toastify';
import { useAuth } from '../lib/context/AuthContext';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {signOut} from '../lib/services/AuthService';

function GameBoard4InARow() {
  const { user, isLoggedIn} = useAuth();
  console.log(user, isLoggedIn);
  
  // @todo update realtime
  const [currentPlayer, setCurrentPlayer] = useState<Player>({playerNumber: 1, username: "Speler"});

  const [field, setField] = useState<BoardCell[]>([
    {"value": 1, "x": 0, "y": 0, new:true}, {"value": 0, "x": 1, "y": 0}, {"value": 0, "x": 2, "y": 0}, {"value": 0, "x": 3, "y": 0}, {"value": 0, "x": 4, "y": 0}, {"value": 0, "x": 5, "y": 0}, {"value": 0, "x": 6, "y": 0}, {"value": 0, "x": 7, "y": 0},
    {"value": 0, "x": 0, "y": 1}, {"value": 0, "x": 1, "y": 1}, {"value": 0, "x": 2, "y": 1}, {"value": 0, "x": 3, "y": 1}, {"value": 0, "x": 4, "y": 1}, {"value": 0, "x": 5, "y": 1}, {"value": 0, "x": 6, "y": 1}, {"value": 0, "x": 7, "y": 1},
    {"value": 0, "x": 0, "y": 2}, {"value": 0, "x": 1, "y": 2}, {"value": 0, "x": 2, "y": 2}, {"value": 0, "x": 3, "y": 2}, {"value": 0, "x": 4, "y": 2}, {"value": 0, "x": 5, "y": 2}, {"value": 0, "x": 6, "y": 2}, {"value": 0, "x": 7, "y": 2},
    {"value": 0, "x": 0, "y": 3}, {"value": 0, "x": 1, "y": 3}, {"value": 0, "x": 2, "y": 3}, {"value": 0, "x": 3, "y": 3}, {"value": 0, "x": 4, "y": 3}, {"value": 0, "x": 5, "y": 3}, {"value": 0, "x": 6, "y": 3}, {"value": 0, "x": 7, "y": 3},
    {"value": 0, "x": 0, "y": 4}, {"value": 0, "x": 1, "y": 4}, {"value": 0, "x": 2, "y": 4}, {"value": 0, "x": 3, "y": 4}, {"value": 0, "x": 4, "y": 4}, {"value": 0, "x": 5, "y": 4}, {"value": 0, "x": 6, "y": 4}, {"value": 0, "x": 7, "y": 4},
    {"value": 2, "x": 0, "y": 5, "new": true}, {"value": 0, "x": 1, "y": 5}, {"value": 0, "x": 2, "y": 5}, {"value": 0, "x": 3, "y": 5}, {"value": 0, "x": 4, "y": 5}, {"value": 0, "x": 5, "y": 5}, {"value": 0, "x": 6, "y": 5}, {"value": 0, "x": 7, "y": 5},
    {"value": 2, "x": 0, "y": 6}, {"value": 0, "x": 1, "y": 6}, {"value": 0, "x": 2, "y": 6}, {"value": 0, "x": 3, "y": 6}, {"value": 0, "x": 4, "y": 6}, {"value": 0, "x": 5, "y": 6}, {"value": 0, "x": 6, "y": 6}, {"value": 0, "x": 7, "y": 6},
    {"value": 1, "x": 0, "y": 7}, {"value": 1, "x": 1, "y": 7}, {"value": 0, "x": 2, "y": 7}, {"value": 0, "x": 3, "y": 7}, {"value": 0, "x": 4, "y": 7}, {"value": 0, "x": 5, "y": 7}, {"value": 0, "x": 6, "y": 7}, {"value": 2, "x": 7, "y": 7, new: true},
  ]);

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
  const logOut = (async () => {
    await signOut();
  });

  return (
    <div className="board-container">
      <Button onClick={logOut}> test</Button>
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
    const response = await axios.get('https://localhost:7161/WeatherForecast/boeie');
    const data = await response.data;

    console.log(data);
    console.log('dwa');
  }

}


export default GameBoard4InARow;