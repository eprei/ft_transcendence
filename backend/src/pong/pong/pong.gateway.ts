import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'

@WebSocketGateway({ path: '/pong' })
export class PongGateway {
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        return 'Hello world!'
    }
}
