import { PartialType } from '@nestjs/mapped-types'
import { CreatePlayerDto } from './create-user.dto'

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
