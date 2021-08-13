import Room from '../../entities/Room';
import { ErrorEnum } from '../../enums/ErrorEnum';
import { RoomStatus } from '../../enums/RoomStatus';
import roomRepository from '../../repositories/RoomRepository'
import roomService from '../../service/RoomService';
class RestartRoomUseCase {
    async execute (roomId: string, socketId: string, vote: Boolean): Promise<Room> {
        try {
            console.log(`${socketId} vote to restart on room ${roomId}`);
            let room = await roomRepository.getById(roomId)

            if (!roomService.isPlayer(room, socketId)) {
                throw new Error(ErrorEnum.ROOM_NOT_FOUND);
            }

            roomService.voteToRestart(room, socketId);
            room.status = RoomStatus.RESTART_VOTE;
            if (room.restartVote.player1 === true && room.restartVote.player2 === true) {
                roomService.restart(room);
            } else if (room.restartVote.player1 === false || room.restartVote.player2 === false ) {
                room.status = RoomStatus.RUNNING;
                roomService.resetVotes(room);
            }
        
            return await roomRepository.save(room);
        } catch(err) {
            throw new Error(ErrorEnum.ROOM_NOT_FOUND);
        }
    }
}

export default new RestartRoomUseCase();