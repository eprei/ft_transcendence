import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateChannelUserDto } from './dto/create-channel-user.dto'
import { UpdateChannelUserDto } from './dto/update-channel-user.dto'
import { ChannelUser } from 'src/typeorm/channel-user.entity'

@Injectable()
export class ChannelUserService {
    constructor(
        @InjectRepository(ChannelUser)
        private readonly channelUserRepository: Repository<ChannelUser>
    ) {}

    async create(createChannelUserDto: CreateChannelUserDto) {
        const existingEntry = await this.findOneByChannelAndPlayer(
            createChannelUserDto.channel_id,
            createChannelUserDto.player_id
        )
        if (existingEntry) {
            throw new HttpException(
                'User alredy in channel',
                HttpStatus.BAD_REQUEST
            ) //   throw new Error('User alredy in channel');
        }

        const channelUser =
            this.channelUserRepository.create(createChannelUserDto)
        return this.channelUserRepository.save(channelUser)
    }

    findAll() {
        return this.channelUserRepository.find()
    }

     // findOne(id: number) {}
}
}



    findOneByChannelAndPlayer(ch_id: number, pl_id: number) :ChannelUser {
        return this.channelUserRepository.findOne({
            where: { channel: { id: ch_id }, player: { id: pl_id } },
        })
    }

	

// 	async getchanByPlayerId(id: number) {
//     let res = await this.channelUserRepository.findOneBy({
//       id: id,
//     });
//     return res.channelUser.;
//   }

    update(id: number, updateChannelUserDto: UpdateChannelUserDto) {
        return `This action updates a #${id} channelUser`
    }

    remove(id: number) {
        return this.channelUserRepository.delete(id)
    }

    async removeByChannelAndPlayer(ch_id: number, pl_id: number) {
        const chUser = await this.channelUserRepository.delete({
            channel: { id: ch_id },
            player: { id: pl_id },
        })
    }
}
