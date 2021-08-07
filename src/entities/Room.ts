import Player from './Player';
import { ErrorEnum } from '../enums/ErrorEnum';
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
    }

    joinRoom (player: Player): void {
      if (this.player1 == undefined) {
        this.player1 = player;
      } else {
        this.player2 = player;
      }
    }

    isFull(): Boolean {
      return this.player1 != undefined && this.player2 != undefined
    }

    leave (playerId: string) {
      if (this.player1.id == playerId) {
        this.player1 == undefined;
      } else if (this.player2.id == playerId) {
        this.player2 = undefined;

      }

      if (this.player1 == undefined || this.player2 == undefined) {
        this.status = RoomStatus.WAITING_FOR_OTHER_PLAYER;
        this.resetBoard();
      }
    }

    resetBoard () {
      this.board = [['', '', ''], ['', '', ''], ['', '', '']];
    }

    nextTurn () {
      if (this.turn == this.player1.id) {
        this.turn = this.player2.id;
      } else {
        this.turn = this.player1.id;
      }
    }

    isPlayer (playerId: string): Boolean {
      return this.player1.id == playerId || this.player2.id == playerId;
    }

    voteToRestart (plauerId: string) {
      if (this.player1.id === plauerId) {
        this.restartVote.player1 = true;
      } else {
        this.restartVote.player2 = true;
      }
    }

    restart () {
      this.resetBoard();
      this.status = RoomStatus.RUNNING;
      this.winner = undefined;
      this.resetVotes();
    }

    resetVotes () {
      this.restartVote = {
        player1: undefined,
        player2: undefined
      };
    }

    isEmpty () {
      return this.player1 == undefined && this.player2 == undefined;
    }
}
