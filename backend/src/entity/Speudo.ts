import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity()
export class Speudo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    speudo: string
}
