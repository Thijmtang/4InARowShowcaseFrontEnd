import React, { useEffect, useState } from 'react'

enum Status {
    inactive,
    player1,
    player2
}

interface Props {
    player: number,
    animation: boolean
}

function GameBoardCell(props:Props) {
    const positionX = 0;
    const positionY = 0;

    const [cssClass, setCssClass] = useState("");
    // const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        // Cells can only be placed by player 1 or 2
        if(props.player > 2 || props.player == 0) {
            return;
        }

        let animation = '';
        if(props.animation) {
            animation = 'new';
        }

        setCssClass(`player-${props.player} ${animation}`);
    });
    const clickEvent = () => {
        // FFC107
        // DC3545
    };

    return (
    <div className={`cell ${cssClass}`} onClick={clickEvent}> </div>
  )
}

export default GameBoardCell

