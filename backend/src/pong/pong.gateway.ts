import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets'
import { PongService } from './pong.service'
import { CreatePongDto } from './dto/create-pong.dto'
import { UpdatePongDto } from './dto/update-pong.dto'

interface Position {
    x: number
    y: number
}

interface Size {
    width: number
    height: number
}

interface Rectangle {
    position: Position
    size: Size
}

interface Frame {
    paddleLeft: Rectangle
    paddleRight: Rectangle
    ball: Rectangle
}

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class PongGateway {
    constructor(private readonly pongService: PongService) {}

    @SubscribeMessage('createPong')
    create(@MessageBody() createPongDto: CreatePongDto) {
        return this.pongService.create(createPongDto)
    }

    @SubscribeMessage('getFrame')
    myGetFrame(@MessageBody() id: number) {
        const PADDLE_WIDTH: number = 10
        const PADDLE_HEIGHT: number = 50
        const BALL_SIZE: number = 10
        console.log('coucou')
        let frame: Frame = {
            paddleLeft: {
                position: {
                    x: 10,
                    y: 20,
                },
                size: {
                    width: PADDLE_WIDTH,
                    height: PADDLE_HEIGHT,
                },
            },
            paddleRight: {
                position: {
                    x: 280,
                    y: 20,
                },
                size: {
                    width: PADDLE_WIDTH,
                    height: PADDLE_HEIGHT,
                },
            },
            ball: {
                position: {
                    x: 50,
                    y: 50,
                },
                size: {
                    width: BALL_SIZE,
                    height: BALL_SIZE,
                },
            },
        }
        return frame
    }

    @SubscribeMessage('findAllPong')
    findAll() {
        return this.pongService.findAll()
    }

    @SubscribeMessage('findOnePong')
    findOne(@MessageBody() id: number) {
        return this.pongService.findOne(id)
    }

    @SubscribeMessage('updatePong')
    update(@MessageBody() updatePongDto: UpdatePongDto) {
        return this.pongService.update(updatePongDto.id, updatePongDto)
    }

    @SubscribeMessage('removePong')
    remove(@MessageBody() id: number) {
        return this.pongService.remove(id)
    }
}
