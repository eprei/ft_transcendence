import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Player } from 'src/typeorm/player.entity'
import { CreatePlayerDto } from './dto/create-player.dto'
import { Repository } from 'typeorm'

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player> // <entidadQCreamos>
    ) {}

    create(createPlayerDto: CreatePlayerDto) {
        const newPlayer = this.playerRepository.create(createPlayerDto)
        return this.playerRepository.save(newPlayer)
    }

    findAll() {
        return this.playerRepository.find()
    }

    findOne(id: number) {
        return `This action returns a #${id} player`
    }

	
	// async deleteUserFromChat(chanId: number, userName: string) {
	// 	let res = await this.ChatUserRepository.findOne({ where: { chatId: chanId, userName: userName } });
	// 	if (res) await this.ChatUserRepository.remove(res);
	// }

	// async findChan(playerId: string, chanId: number): Promise<Player> {
	async findChannnels(playerId: string) {
		let res = await this.playerRepository.findOne({ where: { playerId: playerId } });
	}

// 	async getChanById(id: number) {
// 		let res = await this.playerRepository.findOneBy({
// 		  id: id,
// 		});
// 		return res;
// 	  }

// 	  async getchanByPlayerId(id: number) {
//     let res = await this.playerRepository.findOneBy({
//       id: id,
//     });
//     return res.channelUser.;
//   }
	// return this.playerRepository.findOne(playerId, options);



	// const player = await this.playerService.findChannels(playerId, { relations: ['channel-user'] });
	// this.playerService.findOne(playerId, { relations: ['channel-user'] });

    async remove(login: string) {
        const player = await this.playerRepository.delete({ login: login })
        return player
    }
}
