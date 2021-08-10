import Player from "../entities/Player";
import Room from "../entities/Room";
import { RoomStatus } from "../enums/RoomStatus";

class RoomService {

    public joinRoom (room: Room, player: Player): void {
        if (room.player1 == undefined) {
            room.player1 = player;
        } else {
            room.player2 = player;
        }
  
        if (this.isFull(room)) {
            room.status = RoomStatus.RUNNING
        }
    }
  
    public isFull(room: Room): Boolean {
        return room.player1 != undefined && room.player2 != undefined
    }

    public leave (room: Room, playerId: string) {
        if (room.player1 !== undefined && room.player1.id === playerId) {
            room.player1 = undefined;
        } else if (room.player2 !== undefined && room.player2.id === playerId) {
            room.player2 = undefined;

        }

        if (room.player1 === undefined || room.player2 === undefined) {
            room.status = RoomStatus.WAITING_FOR_OTHER_PLAYER;
            this.resetBoard(room);
        }
    }
  
    public resetBoard (room: Room) {
        room.board = [['', '', ''], ['', '', ''], ['', '', '']];
    }

    public nextTurn (room: Room) {
        if (room.turn == room.player1.id) {
            room.turn = room.player2.id;
        } else {
            room.turn = room.player1.id;
        }
    }

    public isPlayer (room: Room, playerId: string): boolean {
        if (room.player1 !== undefined) {
            if (room.player1.id === playerId){
                return true;
            }
        }

        if (room.player2 !== undefined) {
            if (room.player2.id === playerId){
                return true;
            }
        }
        return false;
    }

    public voteToRestart (room: Room, plauerId: string) {
        if (room.player1.id === plauerId) {
            room.restartVote.player1 = true;
        } else {
            room.restartVote.player2 = true;
        }
    }

    public restart (room: Room) {
        this.resetBoard(room);
        room.status = RoomStatus.RUNNING;
        room.winner = undefined;
        this.resetVotes(room);
        }

        resetVotes (room: Room) {
            room.restartVote = {
                player1: undefined,
                player2: undefined
        };
    }

    public isEmpty (room: Room) {
        return room.player1 == undefined && room.player2 == undefined;
    }

}

export default new RoomService();