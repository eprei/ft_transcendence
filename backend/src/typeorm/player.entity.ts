import { Column,
		 Entity,
		 PrimaryGeneratedColumn,
		 OneToMany } from 'typeorm'

import { ChannelUser } from './channel-user.entity'

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    login: string

    @Column()
    email: string

    @Column()
    avatarUrl: string

    @Column({ default: 0 })
    nbVictory: number

    @Column({ default: 0 })
    totalPlay: number

    @Column({ default: 0 })
    xp: number

	//not sure of utility
	@OneToMany(() => ChannelUser, channelUser => channelUser.player)
	public channelUser: ChannelUser[];
}
