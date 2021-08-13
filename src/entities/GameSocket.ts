import { Socket } from "socket.io";

export interface GameSocket extends Socket
{
  room?: string;
}