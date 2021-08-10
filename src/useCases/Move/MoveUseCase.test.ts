import Player from '../../entities/Player';
import Room from '../../entities/Room'
import { ErrorEnum } from '../../enums/ErrorEnum';
import { RoomStatus } from '../../enums/RoomStatus';
import roomRepository from '../../repositories/RoomRepository'
import moveUseCase from './MoveUseCase';

jest.mock('../../repositories/RoomRepository');
const mockedRoomRepository = roomRepository as jest.Mocked<typeof roomRepository>

test('valid move test', () => {
    expect.assertions(1);
    mockedRoomRepository.getById.mockReturnValueOnce(getRoom2Player());
    
    moveUseCase.execute("123456", "1234", {x: 0, y: 0})
        .then(room => {
            expect(room).toBe(getRoomWithMove());
        })
});


const getRoom2Player = () => {
    const room = new Room("123456", new Player("1234", "userTest"));
    room.player2 = new Player("4321", "testUser");
    return room;
}

const getRoomWithMove = () => {
    const room = new Room("123456", new Player("1234", "userTest"));
    room.player2 = new Player("4321", "testUser");
    room.board[0][0] = "1234";
    return room;
}