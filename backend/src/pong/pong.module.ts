import { Module } from '@nestjs/common'
import { PongGateway } from './pong/pong.gateway'

@Module({
    providers: [PongGateway],
})
export class PongModule {}
