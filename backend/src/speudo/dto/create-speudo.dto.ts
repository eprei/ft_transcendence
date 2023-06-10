import { IsNotEmpty } from 'class-validator'

export class CreateSpeudoDto {
    id: number

    @IsNotEmpty()
    speudo: string
}
