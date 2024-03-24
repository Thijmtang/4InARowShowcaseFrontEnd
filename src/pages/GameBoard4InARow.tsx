/* eslint-disable react-hooks/rules-of-hooks */
import '../assets/GameBoard4InARow.scss';


import { useEffect, useState } from 'react'
import GameBoardCell from '../components/4InARow/GameBoardCell';
import PlayerBadge from '../components/4InARow/PlayerBadge';
import { BoardCell } from '../lib/interfaces/BoardCell';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GameLobby } from '../lib/interfaces/GameLobby';
import { useSignalR } from '../lib/context/SignalRContext';
import { GamePlayer } from '../lib/interfaces/GamePlayer';
import { Button, Modal } from 'react-bootstrap';
import { PlayerTypes } from '../lib/enums/PlayerTypes';

function GameBoard4InARow() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as {gameLobby : GameLobby});

  const {connection, isConnectionValid} = useSignalR();

  if(locationState === null || !isConnectionValid()) {
    return <Navigate to="/" replace={true} />;
  }
  
  const [gameLobby, setGameLobby] = useState<GameLobby>(locationState?.gameLobby);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer>(gameLobby?.Players[gameLobby?.CurrentPlayerTurn]);
  const [winner, setWinner] = useState<GamePlayer>(gameLobby?.Players[gameLobby?.Winner]);

  const [field, setField] = useState<BoardCell[]>(gameLobby?.GameField);

  // ClickCell
  useEffect(() => {
    connection?.on('RenderField', (lobby: string) => {
      setGameLobby(JSON.parse(lobby));
    });

    connection?.on('ShowChoiceModal', () => {
      // setGameLobby(JSON.parse(lobby));
      handleShow();
    });

    connection?.on('Endlobby', () => {
      navigate('/');
    });


    connection?.on('StartGame', () => {
      handleClose();
    });
    // Update lobby when someone leaves,
  }, [connection]);

  useEffect(() => {
    setCurrentPlayer(gameLobby.Players[gameLobby.CurrentPlayerTurn]);
    setWinner(gameLobby.Players[gameLobby?.Winner]);

      setField(gameLobby.GameField);
  }, [gameLobby]);

  const placeCell = (x: number) => {
    // It is not the users turn.
    if(connection?.connectionId != gameLobby.CurrentPlayerTurn) {
      return;
    }

    connection?.send("ClickCell", gameLobby.Code, x);
  }
  
  const startGame = () => {
    connection?.send("StartGame", gameLobby.Code);
  }

  return (
    <div className="board-container">
      <div className="header">
        <div>
        <h1>
          <b>Huidige beurt</b> <PlayerBadge playerType={currentPlayer?.PlayerType}>{currentPlayer?.Username} ({currentPlayer.ConnectionId == connection?.connectionId ? 'Jij': 'Tegenstander'})</PlayerBadge> 
        </h1>
        </div>
      </div>
      <div className='board'>
        {field.map((column, i) => {
          return <GameBoardCell key={i}  animation={column?.New} cell={column} updateField={setField} clickEvent={placeCell} />
        })}
      </div>

      <Modal show={showModal} >
        <Modal.Header>
        <Modal.Title>Het spel is afgelopen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{winner?.ConnectionId != connection?.connectionId ? 'Je hebt verloren 😓': 'Je hebt gewonnen 😀'}</p>
          </Modal.Body>        
          <Modal.Footer>
            <Button variant="secondary" onClick={() => navigate('/')}>Terug naar lobbies</Button>
            <Button variant="primary" disabled={gameLobby.Players[connection?.connectionId].PlayerType === PlayerTypes.Player2} onClick={() => startGame()}>Nog emmm keertje spielen</Button>
          </Modal.Footer>
      </Modal>

    </div>);
}


export default GameBoard4InARow;