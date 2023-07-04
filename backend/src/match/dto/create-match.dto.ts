import { IsNotEmpty, IsOptional } from 'class-validator'
import { Player } from '../../typeorm/user.entity'

export class CreateMatchDto {
    @IsOptional()
    id?: number

    @IsNotEmpty()
    userHome: Player

    @IsNotEmpty()
    userForeign: Player

    @IsNotEmpty()
    winner: Player

    @IsNotEmpty()
    homeScore: number

    @IsNotEmpty()
    foreignScore: number

    @IsOptional()
    timestamp: Date
}
