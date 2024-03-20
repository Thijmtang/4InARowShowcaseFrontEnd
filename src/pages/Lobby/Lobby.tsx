import { FormCard } from '../../components/FormCard'
import { Button } from 'react-bootstrap'
import { GameLobby } from '../../lib/interfaces/GameLobby';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSignalR } from '../../lib/context/SignalRContext';
import {  GamePlayers } from '../../lib/interfaces/GamePlayer';
import { toast } from 'react-toastify';

export const Lobby = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as {gameLobby : GameLobby});
  const {connection} = useSignalR();

  // Connection is no longer valid
  if(!locationState.gameLobby || !connection?.state) {
    navigate('/');
  }

  const gameLobby = locationState.gameLobby;
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [players, setPlayers] = useState<GamePlayers>(gameLobby.Players);
  const [playerNames, setPlayerNames] = useState<string[]>();



  useEffect(() => {
    connection?.on('UpdatePlayerList', (players: string) => {
      setPlayers(JSON.parse(players));
    });

    connection?.on('AllowGameStart', (players: string) => {
      setDisableSubmit(false);
    });

    // Update lobby when someone leaves,
  }, [connection]);


  useEffect(() => {
    const playerNames = [];
    for (const key in players) {
      const player = players[key];
      playerNames.push(`${player.Username}`);
    }

    if(playerNames.length != 2) {
      setDisableSubmit(true);
    }

    setPlayerNames(playerNames);

    console.log(playerNames);
  },[players])

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
          <Button variant={"success" + (disableSubmit ? ' ' + 'disabled' : '')} type="submit">
              Start
          </Button>
        </div>
    </FormCard>
  );

}
