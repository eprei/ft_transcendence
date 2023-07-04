import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Player } from 'src/typeorm/user.entity'
import { CreatePlayerDto } from './dto/create-user.dto'
import { Repository } from 'typeorm'
import { UpdatePlayerDto } from './dto/update-user.dto'

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly userRepository: Repository<Player>
    ) {}
    create(createPlayerDto: CreatePlayerDto) {
        const user = this.userRepository.create(createPlayerDto)
        return this.userRepository.save(user)
    }

    findAll() {
        return this.userRepository.find()
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id: id })
    }

    async update(id: number, updatePlayerDto: UpdatePlayerDto) {
        const user = await this.findOne(id)
        return this.userRepository.save({ ...user, ...updatePlayerDto })
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        return this.userRepository.remove(user)
    }
}
