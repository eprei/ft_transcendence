import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateFriendDto } from './dto/create-friend.dto'
import { UpdateFriendDto } from './dto/update-friend.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Friend } from 'src/typeorm/friend.entity'
import { UserService } from 'src/user/user.service'
import { User } from 'src/typeorm/user.entity'

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>,
        @InjectRepository(User)
        private readonly userService: Repository<User>
    ) {}

    async create(createFriendDto: CreateFriendDto) {
        const { friendId, isPending } = createFriendDto

        const friend = new Friend()
        friend.friend = await this.userService.findOneBy({ id: friendId })

        friend.isPending = isPending

        return this.friendRepository.save(friend)
    }

    findAll() {
        return this.friendRepository.find()
    }

    findOne(friendId: number) {
        return this.friendRepository
            .createQueryBuilder('friend')
            .leftJoinAndSelect('friend.user', 'user')
            .where('friend.id = :id', { id: friendId })
            .getOne()
    }

    async update(id: number, updateFriendDto: UpdateFriendDto) {
        const friend = await this.findOne(id)
        if (!friend) {
            throw new NotFoundException('Friend not found')
        }

        return this.friendRepository.save({ ...friend, ...updateFriendDto })
    }

    async remove(id: number) {
        const friend = await this.findOne(id)
        if (!friend) {
            throw new NotFoundException('Friend not found')
        }

        return this.friendRepository.remove(friend)
    }

    async getAllFriendsByUserId(userId: number): Promise<User[]> {
        const friends = await this.friendRepository.find({
            where: { user: { id: userId } },
            relations: ['friend'],
        })
        return friends.map((friend) => friend.friend)
    }
}
