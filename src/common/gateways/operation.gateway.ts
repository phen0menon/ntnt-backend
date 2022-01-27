import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

export const enum OperationSocketEvents {
  OperationChangeStatus = 'OperationChangeStatus',
}

@WebSocketGateway({ port: 80, cors: { origin: '*' } })
export class OperationSocketGateway {
  @WebSocketServer()
  server: Server;
}
