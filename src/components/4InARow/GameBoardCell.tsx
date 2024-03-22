import React, { useEffect, useState } from 'react'
import { BoardCell } from '../../lib/interfaces/BoardCell';
import axios from 'axios';
import { useSignalR } from '../../lib/context/SignalRContext';

enum Status {
    inactive,
    player1,
    player2
}

interface Props {
    animation: boolean,
    cell: BoardCell,
    updateField: CallableFunction,
    clickEvent: (x: number) => void
}

function GameBoardCell(props:Props) {
    const positionX = props.cell.X;
    const positionY = props.cell.Y;
    const player = props.cell.Value;

    const [cssClass, setCssClass] = useState("");
    // const [forecasts, setForecasts] = useState<Forecast[]>();

    
    useEffect(() => {
        // Cells can only be placed by player 1 or 2
      

        let animation = '';
        if(props.animation) {
            animation = 'new';
        }

        setCssClass(`player-${player} ${animation}`);
    });

    const clickEvent = async () => {
        // const formData = new FormData();
        // formData.append("X", positionX.toString());
        // formData.append("Y", positionY.toString());
        // formData.append("Value", '2');
        // formData.append("New", 'true');
        props.clickEvent(positionX)
        // axios
        //     .post('weatherforecast', formData, 
        //     )
        //     .then(({data}) => {
        //         props.updateField(data);
        //     });

    };  

    const validValue = (() => {
        if(player > 2 || player == 0 || player == null) {
            return false;
        }

        return true;
    });

    return (
    <div className={`cell ${cssClass}`} onClick={clickEvent}> </div>
  )
}

export default GameBoardCell

