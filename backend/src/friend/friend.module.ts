import { Module } from '@nestjs/common'
import { FriendService } from './friend.service'
import { FriendController } from './friend.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Friend } from 'src/typeorm/friend.entity'
import { PlayerModule } from 'src/user/user.module'
import { Player } from 'src/typeorm/user.entity'
import { PlayerService } from 'src/user/user.service'

@Module({
    imports: [TypeOrmModule.forFeature([Friend, Player]), PlayerModule],
    controllers: [FriendController],
    providers: [FriendService, PlayerService],
})
export class FriendModule {}
