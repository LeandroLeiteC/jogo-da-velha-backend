import Room from '../../entities/Room';
import { ErrorEnum } from '../../enums/ErrorEnum';
import roomRepository from '../../repositories/RoomRepository'

class LeaveRoomUseCase {
    async execute (roomId: string, socketId: string): Promise<Room> {
        let room = roomRepository.getById(roomId);
        if (room == undefined || !room.isPlayer(socketId)) {
            throw new Error(ErrorEnum.ROOM_NOT_FOUND);
        }

        room.leave(socketId);
        return roomRepository.save(room);
    }
}

export default new LeaveRoomUseCase();