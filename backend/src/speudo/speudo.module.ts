import { Module } from '@nestjs/common'
import { SpeudoController } from './speudo.controller'
import { SpeudoService } from './speudo.service'

@Module({
    controllers: [SpeudoController],
    providers: [SpeudoService],
})
export class SpeudoModule {}
