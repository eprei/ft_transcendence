import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Player } from './user.entity'
import { Message } from './message.entity'

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    owner: number

    @Column({ type: 'varchar', length: 500 })
    name: string

    @Column()
    type: string

    @Column({
        nullable: true,
    })
    password: string

    @CreateDateColumn()
    creationDate: Date

    @ManyToOne(() => Player, (user) => user.channels)
    @JoinColumn({ name: 'admin' })
    admin: Player

    @ManyToMany(() => Player, (user) => user.channels)
    users: Player[]

    @OneToMany(() => Message, (message) => message.channelId)
    @JoinColumn({ name: 'messages' })
    messages: Message[]
}
