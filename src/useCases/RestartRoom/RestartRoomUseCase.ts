import Room from '../../entities/Room';
import { ErrorEnum } from '../../enums/ErrorEnum';
import { RoomStatus } from '../../enums/RoomStatus';
import roomRepository from '../../repositories/RoomRepository'

class RestartRoomUseCase {
    async execute (roomId: string, socketId: string, vote: Boolean): Promise<Room> {
        let room = roomRepository.getById(roomId);
        if (room == undefined || !room.isPlayer(socketId)) {
            throw new Error(ErrorEnum.ROOM_NOT_FOUND);
        }

        room.voteToRestart(socketId);
        room.status = RoomStatus.RESTART_VOTE;
        if (room.restartVote.player1 === true && room.restartVote.player2 === true) {
            room.restart();
        } else if (room.restartVote.player1 === false || room.restartVote.player2 === false ) {
            room.status = RoomStatus.RUNNING;
            room.resetVotes();
        }
        
        return roomRepository.save(room);
    }
}

export default new RestartRoomUseCase();