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

interface Paddle {
    position: Position
    size: Size
}

interface Frame {
    paddle: Paddle
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
            paddle: {
                size: { width: 3, height: 4 },
                position: { x: 12, y: 24 },
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
