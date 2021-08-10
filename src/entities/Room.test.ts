import { RoomStatus } from "../enums/RoomStatus";
import Player from "./Player";
import Room from "./Room";

test('joinRoom() as player 2 test', () => {
  expect.assertions(1);
  let room = getRoom1Player();
  room.joinRoom(new Player("4321", "user2"));
  expect(room).toBe(getRoom2Player());
});

test('joinRoom() as player 1 test', () => {
  expect.assertions(1);
  let room = getRoom1PlayerAs2();
  room.joinRoom(new Player("1234", "user1"));
  expect(room).toBe(getRoom2Player());
});

test('isFull() with full room', () => {
  expect.assertions(1);
  let room = getRoom2Player();
  expect(room.isFull()).toBe(true);
});

test('isFull() with 1 player room', () => {
  expect.assertions(1);
  let room = getRoom1Player();
  expect(room.isFull()).toBe(false);
});

test('leave() as player 1 with 2 player room', () => {
  expect.assertions(3);
  let room = getRoom2Player();
  room.leave("1234")
  expect(room.player1).toBeUndefined();
  expect(room.player2).toBe({id: "4321", name: "user2"})
  expect(room.status).toBe(RoomStatus.WAITING_FOR_OTHER_PLAYER);
});

test('leave() as player 2 with 2 player room', () => {
  expect.assertions(3);
  let room = getRoom2Player();
  room.leave("4321")
  expect(room.player1).toBe({id: "1234", name: "user1"});
  expect(room.player2).toBeUndefined();
  expect(room.status).toBe(RoomStatus.WAITING_FOR_OTHER_PLAYER);
});

test('leave() with 1 player room', () => {
  expect.assertions(3);
  let room = getRoom1Player();
  room.leave("1234")
  expect(room.player1).toBeUndefined();
  expect(room.player2).toBeUndefined();
  expect(room.status).toBe(RoomStatus.WAITING_FOR_OTHER_PLAYER);
});

test('nextTurn()', () => {
  expect.assertions(3);
  let room = getRoom2Player();
  expect(room.turn).toBe("1234");
  room.nextTurn();
  expect(room.turn).toBe("4321");
  room.nextTurn();
  expect(room.turn).toBe("1234");
});

test('isPlayerConnected(player1) yes', () => {
  expect.assertions(1);
  let room = getRoom1Player();
  expect(room.isPlayerConnected("1234")).toBe(true);
});

test('isPlayerConnected(player1) no', () => {
  expect.assertions(1);
  let room = getRoom1Player();
  expect(room.isPlayerConnected("12345")).toBe(false);
});

test('isPlayerConnected(player2) yes', () => {
  expect.assertions(1);
  let room = getRoom1PlayerAs2();
  expect(room.isPlayerConnected("4321")).toBe(true);
});

test('isPlayerConnected(player2) no', () => {
  expect.assertions(1);
  let room = getRoom1PlayerAs2();
  expect(room.isPlayerConnected("12345")).toBe(false);
});

test('voteToRestart() player 1', () => {
  expect.assertions(2);
  let room = getRoom2Player();
  room.voteToRestart("1234");
  expect(room.restartVote.player1).toBe(true);
  expect(room.restartVote.player2).toBeUndefined();
});

test('voteToRestart() player 2', () => {
  expect.assertions(2);
  let room = getRoom2Player();
  room.voteToRestart("4321");
  expect(room.restartVote.player1).toBeUndefined();
  expect(room.restartVote.player2).toBe(true);
});

test('restart()', () => {
  expect.assertions(2);
  let room = getRoom2Player();
  room.winner = "12314124";
  room.status = RoomStatus.FINISHED
  room.restart();
  expect(room.status).toBe(RoomStatus.RUNNING);
  expect(room.winner).toBeUndefined();
});

test('resetVotes()', () => {
  expect.assertions(1);
  let room = getRoom2Player();
  room.restartVote = {
    player1: true,
    player2: false
  }
  room.resetVotes();
  expect(room.restartVote).toBe({player1: undefined, player2: undefined});
});

test('isEmpty() with 2 players on', () => {
  expect.assertions(1);
  let room = getRoom2Player();
   expect(room.isEmpty).toBe(false);
});

test('isEmpty() with 1 player on', () => {
  expect.assertions(1);
  let room = getRoom1Player();
   expect(room.isEmpty).toBe(false);
});

test('isEmpty() with 0 player on', () => {
  expect.assertions(1);
  let room = getRoom1Player();
  room.player1 = undefined;
  expect(room.isEmpty).toBe(true);
});

const getRoom1Player = () => {
  return new Room("123456", new Player("1234", "user1"));
}

const getRoom1PlayerAs2 = () => {
  let room = new Room("123456", new Player("1234", "user1"));
  room.player1 = undefined;
  room.player2 = new Player("4321", "user2");
  return room;
}

const getRoom2Player = () => {
  const room = new Room("123456", new Player("1234", "user1"));
  room.player2 = new Player("4321", "user2");
  return room;
}