import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets'

@WebSocketGateway({ path: '/pong' })
export class PongGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server
    users: number = 0

    async handleConnection() {
        console.log('handleConnection')
        // A client has connected
        this.users++

        // Notify connected clients of current users
        this.server.emit('users', this.users)
    }

    async handleDisconnect() {
        console.log('handleDisconnect')
        // A client has disconnected
        this.users--

        // Notify connected clients of current users
        this.server.emit('users', this.users)
    }

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        console.log('SubscribeMessage')
        return 'Hello world!'
    }
}
