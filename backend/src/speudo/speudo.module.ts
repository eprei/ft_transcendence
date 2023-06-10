import { Module } from '@nestjs/common'
import { SpeudoController } from './speudo.controller'

@Module({
    controllers: [SpeudoController],
})
export class SpeudoModule {}
