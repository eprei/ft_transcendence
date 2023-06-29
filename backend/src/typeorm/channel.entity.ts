import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

// import { ChannelTypes } from '../types/ChannelTypes.ts'
import { ChannelUser } from './channel-user.entity'

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    owner: number

    @Column({
        unique: true,
        length: 20,
    })
    name: string

    @Column()
    type: string

    @Column({
        length: 30,
        nullable: true,
    })
    password: string

    @CreateDateColumn()
    creationDate: Date

	//not sure of utility
	@OneToMany(() => ChannelUser, channelUser => channelUser.channel)
	public channelUser: ChannelUser[];
}
