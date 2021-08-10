import Player from '../../entities/Player';
import Room from '../../entities/Room';
import { ErrorEnum } from '../../enums/ErrorEnum';
import roomRepository from '../../repositories/RoomRepository';
import joinRoomUseCase from './JoinRoomUseCase';

jest.disableAutomock();
jest.mock('../../repositories/RoomRepository');
jest.mock('../../entities/Room');
const mockedRoomRepository = roomRepository as jest.Mocked<typeof roomRepository>

// test('join not found room test', () => {
//   expect.assertions(1);
//   mockedRoomRepository.getById.mockReturnValueOnce(undefined);

//   joinRoomUseCase.execute("123456", "4321", "user2")
//   .then(data => console.log(data.id))
//   .catch(err => {
//     expect(err.message).toBe(ErrorEnum.ROOM_NOT_FOUND);
//   });
// });

test('join already connected room test', async () => {
  expect.assertions(1);
  const room = getRoom2Player();
  mockedRoomRepository.getById.mockReturnValueOnce(room);
  try {
    await joinRoomUseCase.execute("123456", "1234", "user1")
  } catch (err) {
    expect(err.message).toEqual(ErrorEnum.PLAYER_ALREADY_CONNECTED);
  }
});

// test('join room test', () => {
//   expect.assertions(1);
//   mockedRoomRepository.getById.mockReturnValueOnce(getRoom1Player());
//   mockedRoomRepository.save.mockReturnValueOnce(getRoom2Player());
  
//   joinRoomUseCase.execute("123456", "4321", "user2")
//     .then(room => {
//       expect(room).toBe(getRoom2Player());
//     });
// });



// test('join full room test', () => {
//   expect.assertions(1);
//   mockedRoomRepository.getById.mockReturnValueOnce(getRoom2Player());

//   joinRoomUseCase.execute("123456", "12345", "user3")
//   .catch(err => {
//     expect(err.message).toBe(ErrorEnum.ROOM_IS_FULL);
//   });
// });



const getRoom1Player = () => {
  return new Room("123456", new Player("1234", "user1"));
}

const getRoom2Player = () => {
  const room = new Room("123456", new Player("1234", "user1"));
  room.player2 = new Player("4321", "user2");
  return room;
}