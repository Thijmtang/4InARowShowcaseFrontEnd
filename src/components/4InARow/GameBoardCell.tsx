import React, { useEffect, useState } from 'react'
import { BoardCell } from '../../lib/interfaces/BoardCell';
import axios from 'axios';

enum Status {
    inactive,
    player1,
    player2
}

interface Props {
    animation: boolean,
    cell: BoardCell,
    updateField: CallableFunction
}

function GameBoardCell(props:Props) {
    const positionX = props.cell.x;
    const positionY = props.cell.y;
    const player = props.cell.value;
    
    const [cssClass, setCssClass] = useState("");
    // const [forecasts, setForecasts] = useState<Forecast[]>();

    
    useEffect(() => {
        // Cells can only be placed by player 1 or 2
        if(!validValue()) {
            setCssClass("");
            return;
        }

        let animation = '';
        if(props.animation) {
            animation = 'new';
        }

        setCssClass(`player-${player} ${animation}`);
    });

    const clickEvent = async () => {
        const formData = new FormData();
        formData.append("X", positionX.toString());
        formData.append("Y", positionY.toString());
        formData.append("Value", '2');
        formData.append("New", 'true');

        axios
            .post('weatherforecast', formData, 
            )
            .then(({data}) => {
                props.updateField(data);
            });

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

