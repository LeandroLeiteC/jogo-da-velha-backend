import Room from '../../entities/Room'
import { ErrorEnum } from '../../enums/ErrorEnum';
import { RoomStatus } from '../../enums/RoomStatus';
import roomRepository from '../../repositories/RoomRepository'

class MoveUseCase {
    async execute (roomId: string, socketId: string, move: {x: number, y: number}): Promise<Room> {
        let room = roomRepository.getById(roomId);
        if (room == undefined || !room.isPlayer(socketId)) {
            throw new Error(ErrorEnum.ROOM_NOT_FOUND);
        }

        if (room.status !== RoomStatus.RUNNING) {
            throw new Error(ErrorEnum.GAME_NOT_RUNNNING);
        }

        if (!this.isMoveValid(room.board, move)) {
            throw new Error(ErrorEnum.INVALID_MOVE);
        }

        if (room.turn !== socketId) {
            throw new Error(ErrorEnum.NOT_YOUR_TURN);
        }
        
        try {
            room.board[move.x][move.y] = socketId;
        } catch(err) {
            throw new Error(ErrorEnum.INVALID_MOVE);
        }
        

        if (this.win(room.board)) {
            room.winner = socketId;
            room.status = RoomStatus.FINISHED;
        }

        if (this.draw(room.board)) {
            room.status = RoomStatus.FINISHED;
        }
        
        room.nextTurn();
        
        return roomRepository.save(room);
    }

    private isMoveValid (board: string[][], move: {x: number, y: number}): Boolean {
        return board[move.x][move.y] == "";
    }

    private win (board: string[][]): Boolean {
        for (let x = 0; x < 3; x++) {
            let square1 = board[x][0]
            let square2 = board[x][1]
            let square3 = board[x][2]

            let same: Boolean = square1 == square2 && square1 == square3;

            if(square1 != "" && same) {
                return true;
            }
        }

        for (let y = 0; y < 3; y++) {
            let square1 = board[0][y]
            let square2 = board[1][y]
            let square3 = board[2][y]

            let same: Boolean = square1 == square2 && square1 == square3;

            if (square1 != "" && same) {
                return true;
            }
        }

        let square1 = board[0][0]
        let square2 = board[1][1]
        let square3 = board[2][2]
        let same = square1 == square2 && square1 == square3;
        if (square1 != "" && same) {
            return true;
        }

        square1 = board[0][2]
        square2 = board[1][1]
        square3 = board[2][0]
        same = square1 == square2 && square1 == square3;
        if (square1 != "" && same) {
            return true;
        }

        return false;
    }

    private draw (board: string[][]): Boolean {
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                if (board[x][y] == "") {
                    return false;
                }
            }
        }
        return true;
    }
}

export default new MoveUseCase();