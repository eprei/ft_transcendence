import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Player } from './user.entity'
@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Player, (user) => user.matchWon)
    @JoinColumn({ name: 'winner' })
    winner: Player

    @ManyToOne(() => Player, (user) => user.matchLost)
    @JoinColumn({ name: 'looser' })
    looser: Player

    @Column({ type: 'int' })
    scoreWinner: number

    @Column({ type: 'int' })
    scoreLooser: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateGame: Date
}
