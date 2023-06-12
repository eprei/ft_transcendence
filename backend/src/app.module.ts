import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { PlayerModule } from './player/player.module'
import { Player } from './typeorm/Player'
import { SpeudoModule } from './speudo/speudo.module'
import { Speudo } from './entity/Speudo'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
            entities: [Player, Speudo],
        }),
        PlayerModule,
        SpeudoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
