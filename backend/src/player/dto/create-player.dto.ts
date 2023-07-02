import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreatePlayerDto {
    @IsOptional()
    id: number

    @IsNotEmpty()
    login: string

    @IsOptional()
    avatarUrl: string

    @IsOptional()
    nbVictory: number

    @IsOptional()
    totalPlay: number

    @IsOptional()
    xp: number

    @IsOptional()
    TFASecret: string

    @IsOptional()
    TFAEnabled: boolean
}
