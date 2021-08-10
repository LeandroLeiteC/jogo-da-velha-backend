import Player from "../entities/Player";
import Room from "../entities/Room";
import roomRepository from "./RoomRepository";

test('save and getById', () => {
  expect.assertions(1);
  roomRepository.save(getRoom2Player());
  expect(roomRepository.getById("123456")).toBe(getRoom2Player());
});

test('remove and getAll', () => {
  expect.assertions(1);
  roomRepository.remove("123456");
  expect(roomRepository.getAll()).toBe({rooms: {}})
});

const getRoom2Player = () => {
  const room = new Room("123456", new Player("1234", "user1"));
  room.player2 = new Player("4321", "user2");
  return room;
}