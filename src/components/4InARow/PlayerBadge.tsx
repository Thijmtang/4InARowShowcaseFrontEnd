import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { PlayerTypes } from '../../lib/enums/PlayerTypes';

interface Props {
    children: React.ReactNode;
    playerType: PlayerTypes;
}

function PlayerBadge(props: Props) {
    let color = '';

    switch(props.playerType) {
        case PlayerTypes.player1:
            color = 'warning'
            break;
        case PlayerTypes.player2:
            color = 'danger'
        break;
    }

    
    return (
    <Badge pill bg={color}>{props.children}</Badge>
    );
}

export default PlayerBadge;