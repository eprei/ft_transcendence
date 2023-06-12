import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Speudo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    speudo: string
}
