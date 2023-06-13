// import { Player } from '../../types/Player'

export class CreateChannelDto {
    id: number
    owner: number
    name: string
    type: string
    password: string
    creationDate: Date
    // channelUser: Player[];
}
