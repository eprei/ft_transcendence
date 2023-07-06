import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common'

import { ChannelUserService } from './channel-user.service'
import { CreateChannelUserDto } from './dto/create-channel-user.dto'
import { UpdateChannelUserDto } from './dto/update-channel-user.dto'

@Controller('channel-user')
export class ChannelUserController {
    constructor(private readonly channelUserService: ChannelUserService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createChannelUserDto: CreateChannelUserDto) {
        console.log(createChannelUserDto)
        try {
             const channelUser = await this.channelUserService.create(
                createChannelUserDto
            )
            return channelUser
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    @Get()
    findAll() {
        return this.channelUserService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.channelUserService.findOne(+id)
    }

    @Get(':channelId/:userId')
    findByChAndUser(
        @Param('channelId') channelId: string,
        @Param('userId') userId: string
    ) {
        return this.channelUserService.findOneByChannelAndPlayer(
            +channelId,
            +userId
        )
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateChannelUserDto: UpdateChannelUserDto
    ) {
        return this.channelUserService.update(+id, updateChannelUserDto)
    }

    @Delete(':channelId/:userId')
    removeUserFromChannel(
        @Param('channelId') channelId: string,
        @Param('userId') userId: string
    ) {
        console.log(channelId, userId)
        return this.channelUserService.removeByChannelAndPlayer(
            +channelId,
            +userId
        )
    }
}
