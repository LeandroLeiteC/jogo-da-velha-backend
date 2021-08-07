import Player from '../../entities/Player'
import Room from '../../entities/Room'
import roomRepository from '../../repositories/RoomRepository'
import uuid from 'uuid-random'

class CreateRoomUseCase {
  async execute (socketId: string, username: string): Promise<Room> {
    return roomRepository.save(new Room(uuid(), new Player(socketId, username)));
  }
}

export default new CreateRoomUseCase();