import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { PlayerModule } from './player/player.module'
import { ChannelModule } from './channel/channel.module'
import { ChannelUserModule } from './channel-user/channel-user.module'
import { Player } from './typeorm/player.entity'
import { Channel } from './typeorm/channel.entity'
import { ChannelUser } from './typeorm/channel-user.entity'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.development.env',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true, //quitar en produccion
            entities: [Player, Channel, ChannelUser],
        }),
        PlayerModule,
        // ChannelModule,
        // ChannelUserModule,
    ],
})

export class AppModule {
    static port: number

    constructor(private readonly configService: ConfigService) {
        AppModule.port = +this.configService.get('PORT')
    }
}
