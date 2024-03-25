import  { useEffect, useState } from 'react'
import { BoardCell } from '../../lib/interfaces/BoardCell';

interface Props {
    animation: boolean,
    cell: BoardCell,
    updateField: CallableFunction,
    clickEvent: (x: number) => void
}

function GameBoardCell(props:Props) {
    const positionX = props.cell.X;
    const player = props.cell.Value;

    const [cssClass, setCssClass] = useState("");

    
    useEffect(() => {
        let animation = '';
        if(props.animation) {
            animation = 'new';
        }

        setCssClass(`player-${player} ${animation}`);
    }, [props.animation, player]);

    const clickEvent = async () => {
        props.clickEvent(positionX)
    };  

    return (
    <div className={`cell ${cssClass}`} onClick={clickEvent}> </div>
  )
}

export default GameBoardCell

