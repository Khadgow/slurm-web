import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { Client, Channel } from 'ssh2';
import { JwtService } from '@nestjs/jwt';
import { decode } from 'utf8';
import * as process from 'process';
import * as fs from 'fs';
@WebSocketGateway({ cors: true })
export class SshGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private jwtService: JwtService) {}

  @WebSocketServer()
  server: Server;

  sshConnection = new Client();

  channel: Channel;

  @SubscribeMessage('data')
  handleEvent(@MessageBody() data: string) {
    if (this.channel) {
      this.channel.write(data);
    }
  }

  afterInit(server: Server) {
    this.sshConnection
      .on('ready', () => {
        this.server.emit('data', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
        this.sshConnection.shell((err, channel) => {
          if (err) {
            return server.emit(
              'data',
              '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n',
            );
          }
          this.channel = channel;
          channel
            .on('data', (code) => {
              this.server.emit('data', decode(code.toString('binary')));
            })
            .on('close', () => {
              this.sshConnection.end();
            });
        });
      })
      .on('close', () => {
        this.server.emit('data', '\r\n*** SSH CONNECTION CLOSED ***\r\n');
      })
      .on('error', (err) => {
        console.log(err);
        this.server.emit(
          'data',
          `\\r\\n*** SSH CONNECTION ERROR: ${err.message} ***\\r\\n`,
        );
      });
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    const token = client.handshake.headers?.authorization?.split(' ')[1];
    if (token) {
      try {
        const user = this.jwtService.verify(token);
        if (user) {
          this.sshConnection.connect({
            host: process.env.SSH_HOST,
            port: Number(process.env.SHH_PORT),
            username: process.env.SHH_USER,
            password: process.env.SSH_PASSWORD,
            privateKey: process.env.SHH_KEY_LOCATION
              ? fs.readFileSync(process.env.SHH_KEY_LOCATION)
              : undefined,
          });
        }
        return;
      } catch (err) {
        this.server.emit('data', 'user unauthorized');
        this.server.emit('error', '401');
        this.server.disconnectSockets();
      }
    }
    this.server.emit('data', 'user unauthorized');
    this.server.emit('error', '401');
    this.server.disconnectSockets();
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.sshConnection.end();
  }
}
