import { IsEmail, IsNotEmpty, Allow } from 'class-validator'
// import { Channel } from '../../types/Channel'

export class CreatePlayerDto {
    id: number

    @IsNotEmpty()
    login: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @Allow()
    avatarUrl: string

    nbVictory: number

    totalPlay: number

    xp: number
    // createdChannels: Channel[];
}
