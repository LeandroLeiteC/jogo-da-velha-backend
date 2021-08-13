import Player from '../../entities/Player'
import Room from '../../entities/Room'
import { ErrorEnum } from '../../enums/ErrorEnum';
import roomRepository from '../../repositories/RoomRepository'
import roomService from '../../service/RoomService';

class JoinRoomUseCase {
  async execute (roomId: string, socketId: string, username: string): Promise<Room> {
    console.log(`${socketId} is trying to join room ${roomId}`);
    if (username === undefined || username.length > 15) {
        throw new Error(ErrorEnum.INVALID_USERNAME);
    }
    
    try {
        let room = await roomRepository.getById(roomId)
        this.validate(room, socketId);
        roomService.joinRoom(room, new Player(socketId, username));
        console.log(`${socketId} joined on room ${roomId}`);
        return await roomRepository.save(room);
    } catch(err) {
        throw new Error(err.message);
    }
  }

  private validate = (room: Room, socketId: string) => {
    if (roomService.isPlayer(room, socketId)) {
      throw new Error(ErrorEnum.ROOM_NOT_FOUND);
    }

    if (roomService.isFull(room)) {
      throw new Error(ErrorEnum.ROOM_IS_FULL);
    }
  }
}

export default new JoinRoomUseCase();