import Room from '../entities/Room'
import { ErrorEnum } from '../enums/ErrorEnum';
import redisGateway from '../redis/RedisGateway';
class RoomRepository {
  private state = {
    rooms: {}
  };

  public async save (room: Room): Promise<Room> {
    redisGateway.set(room.id, JSON.stringify(room));
    return this.getById(room.id);
  }

  public remove (id: string): void {
    redisGateway.delete(id);
  }

  public async getById (id: string): Promise<Room> {
    return redisGateway.get(id)
      .then(data => {
        if (data === null) {
          throw new Error(ErrorEnum.ROOM_NOT_FOUND);
        }
          return <Room> JSON.parse(data);
      })
      .catch(() => {
        throw new Error(ErrorEnum.ROOM_NOT_FOUND);
      });
  }
}

export default new RoomRepository()
