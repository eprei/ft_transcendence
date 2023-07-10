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
        console.log('coucou')
        let frame: Frame = {
            paddleLeft: {
                size: { width: 3, height: 4 },
                position: { x: 12, y: 24 },
            },
            paddleRight: {
                size: { width: 13, height: 14 },
                position: { x: 12, y: 24 },
            },
            ball: {
                size: { width: 10, height: 20 },
                position: { x: 5, y: 5 },
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
