import Room from '../entities/Room'

class RoomRepository {
  private state = {
    rooms: {}
  };

  public save (room: Room): Room {
    this.state.rooms[room.id] = room;
    return room;
  }

  public remove (id: string): void {
    delete this.state.rooms[id];
  }

  public getById (id: string): Room {
    return this.state.rooms[id];
  }

  public getAll() {
    return this.state.rooms;
  }
}

export default new RoomRepository()
