import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets'

@WebSocketGateway()
export class PongGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server
    users: number = 0

    async handleConnection() {
        // A client has connected
        this.users++

        // Notify connected clients of current users
        this.server.emit('users', this.users)
        console.log(`users number: ${this.users}`)
    }

    async handleDisconnect() {
        // A client has disconnected
        this.users--

        // Notify connected clients of current users
        this.server.emit('users', this.users)
    }

    @SubscribeMessage('pong')
    async onPong(client, message) {
        client.broadcast.emit('pong', message)
    }
}
