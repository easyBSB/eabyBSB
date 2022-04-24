import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { interval, map, Observable } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*'
  },
  path: '/api/trace'
})
export class EasyBSBGateway {

  @WebSocketServer()
  server: Server;

  constructor() {
    console.log('ws test')
  }

  @SubscribeMessage('easy-bsb/trace')
  trace(): Observable<{ event: string, data: number}> {
    console.log('trace called')
    return interval(1000).pipe(
      map((value) => ({
        event: 'easy-bsb/trace',
        data: value
      }))
    )
  }
}
