import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Player } from './player.entity'
import { Channel } from './channel.entity'

@Entity()
export class ChannelUser {
    @PrimaryGeneratedColumn()
    id: number

	// @JoinColumn()
    @ManyToOne(() => Player, (player) => Player, { onDelete: 'CASCADE' })
    player: Player

	// @JoinColumn()
    @ManyToOne(() => Channel, (channel) => Channel, { onDelete: 'CASCADE' })
    channel: Channel

    @Column()
    isAdmin: boolean

    @Column()
    penalty: boolean
}
