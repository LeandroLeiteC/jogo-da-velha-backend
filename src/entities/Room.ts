import Player from './Player';
import { RoomStatus } from '../enums/RoomStatus';

export default class Room {
    id: string;
    player1: Player;
    player2: Player;
    board: string[][];
    status: RoomStatus;
    winner: string;
    turn: string;
    restartVote: {
        player1: Boolean,
        player2: Boolean
    };

    constructor (id: string, player: Player) {
      this.id = id;
      this.player1 = player;
      this.board = [['', '', ''], ['', '', ''], ['', '', '']];
      this.status = RoomStatus.WAITING_FOR_OTHER_PLAYER;
      this.turn = player.id;
      this.restartVote = { player1: undefined, player2: undefined };
      this.player2
    }
}
