import { Request, Response } from 'express'
import Room from '../entities/Room';
import roomRepository from '../repositories/RoomRepository'

class RoomController {

  constructor() {}

  public async get (req: Request, res: Response): Promise<Response> {
    let rooms: Room[] = [];
    let roomsFromRepo = roomRepository.getAll();
    for(let prop in roomsFromRepo) {
       rooms.push(roomsFromRepo[prop])
    }
    return res.json(rooms);
  }
}

export default new RoomController();
