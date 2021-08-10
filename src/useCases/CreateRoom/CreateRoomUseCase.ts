import Player from '../../entities/Player'
import Room from '../../entities/Room'
import roomRepository from '../../repositories/RoomRepository'
import uuid from 'uuid-random'

class CreateRoomUseCase {
  async execute (socketId: string, username: string): Promise<Room> {
    const room = await roomRepository.save(new Room(uuid(), new Player(socketId, username)));
    return room;
  }
}

export default new CreateRoomUseCase();