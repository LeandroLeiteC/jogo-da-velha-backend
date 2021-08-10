import Player from '../../entities/Player'
import Room from '../../entities/Room'
import { ErrorEnum } from '../../enums/ErrorEnum';
import { RoomStatus } from '../../enums/RoomStatus';
import roomRepository from '../../repositories/RoomRepository'

class JoinRoomUseCase {
  async execute (roomId: string, socketId: string, username: string): Promise<Room> {
    let room = roomRepository.getById(roomId);

    if (room === undefined) {
      throw new Error(ErrorEnum.ROOM_NOT_FOUND);
    }
    console.log(room)
    if (room.isPlayerConnected(socketId)) {
      throw new Error(ErrorEnum.PLAYER_ALREADY_CONNECTED)
    }

    if (room.isFull()) {
      throw new Error(ErrorEnum.ROOM_IS_FULL);
    }

    room.joinRoom(new Player(socketId, username));
    
    if (room.isFull()) {
      room.status = RoomStatus.RUNNING
    }

    return roomRepository.save(room);
  }
}

export default new JoinRoomUseCase();