import Room from '../../entities/Room';
import { ErrorEnum } from '../../enums/ErrorEnum';
import roomRepository from '../../repositories/RoomRepository'
import roomService from '../../service/RoomService';
class LeaveRoomUseCase {
    async execute (roomId: string, socketId: string): Promise<Room> {
        try {
            console.log(`${socketId} is leaving room ${roomId}`);
            let room = await roomRepository.getById(roomId)
            if (!roomService.isPlayer(room, socketId)) {
                throw new Error(ErrorEnum.ROOM_NOT_FOUND);
            }
    
            roomService.leave(room, socketId);
    
            if (roomService.isEmpty(room)) {
                roomRepository.remove(room.id);
                return room;
            } else {
                return await roomRepository.save(room);
            }
        } catch(err) {
            throw new Error(err.message);
        }
    }
}

export default new LeaveRoomUseCase();