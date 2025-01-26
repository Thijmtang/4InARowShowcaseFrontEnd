import { useEffect, useState } from "react";
import { BoardCell } from "../../lib/interfaces/BoardCell";

interface Props {
  animation: boolean;
  cell: BoardCell;
  clickable: boolean;
  clickEvent: (x: number) => void;
}

function GameBoardCell(props: Readonly<Props>) {
  const positionX = props.cell.X;
  const player = props.cell.Value;

  const [cssClass, setCssClass] = useState("");

  useEffect(() => {
    let animation = "";
    if (props.animation) {
      animation = "new";
    }
    let clickable = "";
    if (!props.clickable) {
      clickable = "not-clickable";
    }

    setCssClass(`player-${player} ${animation} ${clickable}`);
  }, [props.animation, player, props.clickable]);

  const clickEvent = async () => {
    props.clickEvent(positionX);
  };

  return <button className={`cell ${cssClass}`} onClick={clickEvent} />;
}

export default GameBoardCell;
