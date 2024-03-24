import { FormCard } from '../../components/FormCard'
import { Button } from 'react-bootstrap'
import { GameLobby } from '../../lib/interfaces/GameLobby';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSignalR } from '../../lib/context/SignalRContext';
import {  GamePlayers } from '../../lib/interfaces/GamePlayer';
import { toast } from 'react-toastify';
import { PlayerTypes } from "../../lib/enums/PlayerTypes";

export const Lobby = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as {gameLobby : GameLobby});
  const {connection, isConnectionValid} = useSignalR();

  // Connection is no longer valid
  if(!locationState.gameLobby || !isConnectionValid) {
    navigate('/');
  }

  const gameLobby = locationState.gameLobby;
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [players, setPlayers] = useState<GamePlayers>(gameLobby.Players);
  const [playerNames, setPlayerNames] = useState<string[]>();


  useEffect(() => {
    // Update lobby when someone leaves,
    connection?.on('UpdatePlayerList', (players: string) => {
      setPlayers(JSON.parse(players));
    });

    connection?.on('AllowGameStart', () => {
      setDisableSubmit(false);
    });

    connection?.on('RenderField', (lobby: string) => {
      setDisableSubmit(false);

      navigate('/game', {
        state: {
          gameLobby: JSON.parse(lobby),
        },
      })
    });

  }, [connection]);


  useEffect(() => {
    const playerNames = [];
    let player1;
    let player2;

    for (const key in players) {
      const player = players[key];

      if(player.PlayerType === PlayerTypes.Player1) {
        player1 = player;
        continue;
      }
      player2 = player;
    }

    if(player1) {
      playerNames.push(`${player1?.Username}`);
    }
    if(player2) {
      playerNames.push(`${player2?.Username}`);
    }




    if(playerNames.length != 2) {
      setDisableSubmit(true);
    }

    setPlayerNames(playerNames);

  },[players])

  const startGame = () => {
    var currentPlayer = players[connection?.connectionId];
    if(players[connection?.connectionId].PlayerType != PlayerTypes.Player1) {
      toast.error("Jij bent niet de lobby leader!")
      return;
    }

    connection?.send("StartGame", gameLobby.Code);
  }

  const CopyCodeClipBoard = () => {
    navigator.clipboard.writeText(gameLobby.Code);
    toast.warning('Lobby code is naar het klembord gekopieerd');
  };


  return (
    <FormCard> 
        <div className='d-flex justify-content-between'>
          <h1>Lobby: {gameLobby.Code}</h1>
          <Button variant='outline-secondary' onClick={() => CopyCodeClipBoard()}>Copy</Button>

        </div>
     
        <div>
          {playerNames?.map((playerName, index) => {
            return <div key={index}>Speler {index+1}: {playerName}</div>;
          })}
        </div>

        <div className="footer">
          <Button variant={"success" + (disableSubmit ? ' ' + 'disabled' : '')} type="submit" onClick={() => startGame()}>
              Start
          </Button>
        </div>
    </FormCard>
  );

}
