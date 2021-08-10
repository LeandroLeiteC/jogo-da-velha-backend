import Player from '../../entities/Player';
import Room from '../../entities/Room';
import { ErrorEnum } from '../../enums/ErrorEnum';
import roomRepository from '../../repositories/RoomRepository'
import leaveRoomUseCase from './LeaveRoomUseCase';


jest.mock('../../repositories/RoomRepository');
const mockedRoomRepository = roomRepository as jest.Mocked<typeof roomRepository>

test('leave room test', () => {
    expect.assertions(1);
    mockedRoomRepository.getById.mockReturnValueOnce(getRoom2Player());
    leaveRoomUseCase.execute("123456", "1234")
        .then(room => expect(room).toBe(getRoom1Player()));
});

test('leave 1 player room test', () => {
    expect.assertions(1);
    mockedRoomRepository.getById.mockReturnValueOnce(getRoom1Player());
    leaveRoomUseCase.execute('123456', '1234')
        .then(room => expect(room).toBe(getRoomEmpty()));
});

test('leave not found room test', () => {
    expect.assertions(1);
    mockedRoomRepository.getById.mockReturnValueOnce(undefined);
    leaveRoomUseCase.execute('123456', '1234')
        .catch(err => expect(err.message).toBe(ErrorEnum.ROOM_NOT_FOUND));
});


const getRoomEmpty = () => {
    const room = new Room("123456", new Player("1234", "userTest"));
    room.player1 = undefined;
    return room;
}

const getRoom1Player = () => {
    return new Room("123456", new Player("1234", "userTest"));
}

const getRoom2Player = () => {
    const room = new Room("123456", new Player("1234", "userTest"));
    room.player2 = new Player("4321", "testUser");
    return room;
}