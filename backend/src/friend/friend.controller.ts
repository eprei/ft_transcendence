import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { FriendService } from './friend.service'
import { CreateFriendDto } from './dto/create-friend.dto'
import { UpdateFriendDto } from './dto/update-friend.dto'

@Controller('friend')
export class FriendController {
    constructor(private readonly friendService: FriendService) {}

    @Post()
    async create(@Body() createFriendDto: CreateFriendDto) {
        const friend = await this.friendService.create(createFriendDto)
        return friend
    }

    @Get()
    async findAll() {
        const friends = await this.friendService.findAll()
        return friends
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const friend = await this.friendService.findOne(+id)
        return friend
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateFriendDto: UpdateFriendDto
    ) {
        const friend = await this.friendService.update(+id, updateFriendDto)
        return friend
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const friend = await this.friendService.remove(+id)
        return friend
    }
}