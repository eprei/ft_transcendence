import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Player } from './user.entity'

@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Player, (user) => user.friends)
    user: Player

    @ManyToOne(() => Player, (user) => user.friendOf)
    friend: Player

    @Column()
    isPending: boolean
}
