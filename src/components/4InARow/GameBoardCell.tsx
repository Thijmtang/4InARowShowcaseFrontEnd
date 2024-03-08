import React, { useEffect, useState } from 'react'
import { BoardCell } from '../../interfaces/BoardCell';
import { json } from 'react-router-dom';
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
        if(player > 2 || player == 0) {
            setCssClass('');
            return;
        }

        let animation = '';
        if(props.animation) {
            animation = 'new';
        }

        setCssClass(`player-${player} ${animation}`);
    });
    const clickEvent = async () => {

        // const response = await fetch('weatherforecast', {method: 'POST', body: JSON.stringify(props.cell)});
        // const data = await response.json();
        // console.log(data);


        let formData = new FormData();
        formData.append("X", positionX.toString());
        formData.append("Y", positionY.toString());
        formData.append("Value", '2');
        formData.append("New", 'true');

        axios
            .post('weatherforecast', formData, 
            )
            .then(({data}) => {
                console.log(data);
                props.updateField(data);
            });

    };  

    return (
    <div className={`cell ${cssClass}`} onClick={clickEvent}> </div>
  )
}

export default GameBoardCell

