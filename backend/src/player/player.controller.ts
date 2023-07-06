import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
	NotFoundException
} from '@nestjs/common'
import { PlayerService } from './player.service'
import { CreatePlayerDto } from './dto/create-player.dto'

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {} //depende de un player service para ser instanciada

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createPlayerDto: CreatePlayerDto) {
        console.log(createPlayerDto)
        const player = this.playerService.create(createPlayerDto)
        return player
    }

    @Get()
    async findAll() {
        const player = await this.playerService.findAll()
        return player
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.playerService.findOne(+id)
    }

	@Get(':playerId/channels/count')
	async countPlayerChannels(@Param('playerId') playerId: string) {
	  const player = await this.playerService.findChannels(playerId);
  
	  if (!player) {
		throw new NotFoundException('Player not found');
	  }
  
	  const channelCount = player.channelUsers.length;
  
	  return { channelCount };
	}
  }


    @Delete(':login')
    remove(@Param('login') login: string) {
        console.log(login)
        return this.playerService.remove(login)
    }
}
