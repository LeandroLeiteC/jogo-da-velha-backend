import Room from '../../entities/Room';
import { ErrorEnum } from '../../enums/ErrorEnum';
import { RoomStatus } from '../../enums/RoomStatus';
import roomRepository from '../../repositories/RoomRepository'

class RestartRoomUseCase {
    async execute (roomId: string, socketId: string): Promise<Room> {
        let room = roomRepository.getById(roomId);
        if (room == undefined || !room.isPlayer(socketId)) {
            throw new Error(ErrorEnum.ROOM_NOT_FOUND);
        }

        room.voteToRestart(socketId)
        room.status = RoomStatus.RESTART_VOTE
        return roomRepository.save(room);
    }
}

export default new RestartRoomUseCase();