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
    heigth: number
}

interface Paddle {
	size: Size
	position: Position
}

interface Ball {
	size: number
	position: Position
}

interface Pong {
	paddleLeft: Paddle
	paddleRigth: Paddle
	ball: Ball
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
        let frame: Frame = { x: 12, y: 24 }
        return frame
    }

    @SubscribeMessage('getFramePong')
    myGetFramePong(@MessageBody() id: number) {
        let frame: Frame = { x: 12, y: 24 }
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
