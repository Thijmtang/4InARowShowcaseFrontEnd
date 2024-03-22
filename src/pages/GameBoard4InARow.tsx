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
import { useLocation, useNavigate } from 'react-router-dom';
import { GameLobby } from '../lib/interfaces/GameLobby';
import { useSignalR } from '../lib/context/SignalRContext';
import { GamePlayer } from '../lib/interfaces/GamePlayer';
import { Lobby } from './Lobby/Lobby';

function GameBoard4InARow() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as {gameLobby : GameLobby});

  const {connection} = useSignalR();
 
  if(!locationState.gameLobby || !connection?.state) {
    navigate('/');
  }
  
  const [gameLobby, setGameLobby] = useState<GameLobby>(locationState.gameLobby);
  const [rows, setRows] = useState<JSX.Element[]>();
  // @todo update realtime
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer>(gameLobby.Players[gameLobby.CurrentPlayerTurn]);

  const [field, setField] = useState<BoardCell[]>(gameLobby.GameField);

  // ClickCell

  useEffect(() => {
    getGameField();
  }, []);

  useEffect(() => {
    connection?.on('RenderField', (lobby: string) => {
      console.log('werkt dit?');
      setGameLobby(JSON.parse(lobby));
      setCurrentPlayer(gameLobby.Players[gameLobby.CurrentPlayerTurn]);
      setField(gameLobby.GameField);

      console.log(field);

    });

    // Update lobby when someone leaves,
  }, [connection]);

  const placeCell = (x: number) => {
    connection?.send("ClickCell", gameLobby.Code, 1);
    console.log('uh')
  }

  useEffect(() => {
    const rows = [];
    field?.forEach((column, i) => {
      const animation = column?.new === true;
      rows.push(<GameBoardCell key={i}  animation={animation} cell={column} updateField={setField} clickEvent={placeCell}/>);
    });
    setRows(rows);
  },[field])

  


  return (
    <div className="board-container">
      <div className="header">
        <div>
        <h1>
          <b>Huidige beurt</b> <PlayerBadge playerType={currentPlayer?.PlayerType}>{currentPlayer?.Username}</PlayerBadge> 
        </h1>
        </div>
      </div>
      <div className='board'>
        {rows}
      </div>
    </div>
 
  );

  async function getGameField() {
    // const response = await axios.get('https://localhost:7161/WeatherForecast/boeie');
    // const data = await response.data;

    // console.log(data);
    // console.log('dwa');
  }

}


export default GameBoard4InARow;