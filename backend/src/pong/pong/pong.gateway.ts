import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets'

@WebSocketGateway({ path: '/pong' })
export class PongGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        return 'Hello world!'
    }
}
