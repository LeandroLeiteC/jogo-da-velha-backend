import Player from '../../entities/Player';
import Room from '../../entities/Room';
import roomRepository from '../../repositories/RoomRepository';
import createRoomUseCase from './CreateRoomUseCase';


jest.mock('../../repositories/RoomRepository');
const mockedRoomRepository = roomRepository as jest.Mocked<typeof roomRepository>

test('create room test', () => {
  expect.assertions(1);
  const socketId = "123456";
  const username = "userTest";
  const room = new Room("1234", new Player(socketId, username));
  mockedRoomRepository.save.mockReturnValueOnce(room);

  createRoomUseCase.execute(socketId, username)
    .then(r => {
      expect(r).toBe(room);
    });
})