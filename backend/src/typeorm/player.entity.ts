import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm'
import { Channel } from './channel.entity'
import { Friend } from './friend.entity'
import { Match } from './match.entity'

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        type: 'text',
    })
    login: string

    @Column('text')
    avatarUrl: string

    @Column({ type: 'int', default: 0 })
    nbVictory: number

    @Column({ type: 'int', default: 0 })
    totalPlay: number

    @Column({ type: 'int', default: 0 })
    xp: number

    @Column({ default: '' })
    TFASecret: string

    @Column({ default: false })
    TFAEnabled: boolean

    @Column({ default: '' })
    FT_id: string

    @ManyToMany(() => Channel, (channel) => channel.players)
    @JoinTable()
    channels: Channel[]

    @OneToMany(() => Friend, (friend) => friend.player)
    friends: Friend[]

    @OneToMany(() => Friend, (friend) => friend.friend)
    friendOf: Friend[]

    @OneToMany(() => Match, (match) => match.looser)
    matchLost: Match[]

    @OneToMany(() => Match, (match) => match.winner)
    matchWon: Match[]
}
