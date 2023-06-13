import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Player } from './player.entity'

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number

    // The side you set @JoinColumn on,  that side's table will contain a "relation id"
    // and the foreign keys to targe entity table

    //bidirectional
    // @ManyToOne(() => Player, (player) => player.id) //apres virgule inverse side parameter

    //unidirectional
    //varios canales para un solo user posible
    //1st word actual entity 2nd Foreign entity
    @ManyToOne(() => Player)
    @JoinColumn()
    owner: Player

    @Column({
        unique: true,
        length: 20,
    })
    name: string

    @Column()
    type: string

    @Column()
    password: string

    @CreateDateColumn()
    creationDate: Date

    //chUser table
    // @OneToMany(() => ChannelUser)
    // channelUser: ChannelUser;
}
