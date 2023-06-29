import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Player } from './player.entity'
import { Channel } from './channel.entity'

@Entity()
export class ChannelUser {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Player, (player) => Player)
    player: Player

    @ManyToOne(() => Channel, (channel) => Channel)
    channel: Channel

    @Column()
    isAdmin: boolean

    @Column()
    penalty: boolean
}
