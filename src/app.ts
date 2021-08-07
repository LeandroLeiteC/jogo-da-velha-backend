import express from 'express';
import routes from './routes';
import http from 'http';
import { Server } from 'socket.io';
import createRoomUseCase from './useCases/CreateRoom/CreateRoomUseCase';
import joinRoomUseCase from './useCases/JoinRoom/JoinRoomUseCase';
import moveUseCase from './useCases/Move/MoveUseCase';
import leaveRoomUseCase from './useCases/LeaveRoom/LeaveRoomUseCase';
import restartRoomUseCase from './useCases/RestartRoom/RestartRoomUseCase';

class App {
  public express: express.Application;
  public server: http.Server;
  public io: Server;

  public constructor () {
    this.routes();
    this.sockets();
    this.listen();
  }

  private routes (): void {
    this.express = express();
    this.express.use(routes);
    this.middlewares();
  }

  private middlewares (): void {
    this.express.use(express.json());
  }

  private sockets (): void {
    this.server = http.createServer(this.express);
    this.io = new Server(this.server, {
      cors: {
        origin: '*'
      }
    });
  }

  private listen (): void {

    this.io.on('connection', socket => {

      socket.on('join', (data: {username: string, room?: string}) => {
        if( data.room === undefined ) {
          createRoomUseCase.execute(socket.id, data.username)
            .then(room => {
              socket['room'] = room.id;
              socket.join(room.id);
              this.io.to(room.id).emit('room', {...room});
          });
        } else {
          joinRoomUseCase.execute(data.room, socket.id, data.username)
            .then(room => {
              socket['room'] = room.id;
              socket.join(room.id);
              this.io.to(room.id).emit('room', {...room});
            })
            .catch (err => {
              socket.emit('game-error', {error: err.message});
            });
        }
      });

      socket.on('move', (data: {x: number, y: number}) => {
        moveUseCase.execute(socket['room'], socket.id, data)
          .then(room => {
            this.io.sockets.to(room.id).emit('room', {...room});
          }).catch(err => {
            socket.emit('game-error', {error: err.message});
          });
      });

      socket.on('restart', (data: {wantTo: Boolean}) => {
        restartRoomUseCase.execute(socket['room'], socket.id, data.wantTo)
          .then(room => {
            this.io.sockets.to(room.id).emit('room', {...room});
          }).catch(err => {
            socket.emit('game-error', {error: err.message});
          });
      });

      socket.on('leave', () => {
        leaveRoomUseCase.execute(socket['room'], socket.id)
          .then(room => {
            socket.leave(room.id);
            if (!room.isEmpty) {
              socket.to(room.id).emit('room', {...room});
            }
          });
      });

      socket.on('disconnect', () => {
        leaveRoomUseCase.execute(socket['room'], socket.id)
          .then(room => {
            socket.leave(room.id);
            socket.to(room.id).emit('room', {...room});
          });
      });

    });

  }
}

export default new App()
