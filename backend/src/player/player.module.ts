import { Module } from '@nestjs/common'
import { PlayerService } from './user.service'
import { PlayerController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Player } from 'src/typeorm/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Player])],
    controllers: [PlayerController],
    providers: [PlayerService],
})
export class PlayerModule {}
