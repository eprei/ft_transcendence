import { Injectable, Request, NotFoundException } from '@nestjs/common'
import { Room } from 'src/types/Room'
import { User } from 'src/typeorm/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRoomDto } from './dto/create-room.dto'
import { UserService } from 'src/user/user.service'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userService: UserService
    ) {}

    private readonly rooms: Room[] = []

    getAllRooms(): Room[] {
        return this.rooms
    }

    getRoomById(id: number): Room {
        return this.rooms.find(
            (room) => room.player_one === id || room.player_two === id
        )
    }

    async createRoom(
        @Request() req: any,
        createRoomDto: CreateRoomDto
    ): Promise<Room> {
        const userMe = await this.userRepository.findOneBy({ id: req.user.id })

        if (!userMe) {
            throw new NotFoundException('User not found')
        }

        if (userMe.status === 'playing') {
            throw new Error('You are already playing')
        }

        this.userService.changeStatusPlaying(userMe.id)

        const room: Room = {
            player_one: userMe.id,
            player_two: 0,
            theme: createRoomDto.theme,
            room_id: uuidv4(),
        }

        this.rooms.push(room)

        // TODO change the status at the end of the game
        // this.userService.changeStatusOnLine(myId)

        return room
    }

    updateRoom(id: number, updatedRoom: Room): Room {
        const index = this.rooms.findIndex(
            (room) => room.player_one === id || room.player_two === id
        )
        if (index !== -1) {
            this.rooms[index] = { ...this.rooms[index], ...updatedRoom }
            return this.rooms[index]
        }
        return null
    }

    deleteRoom(id: number): Room {
        const index = this.rooms.findIndex(
            (room) => room.player_one === id || room.player_two === id
        )
        if (index !== -1) {
            return this.rooms.splice(index, 1)[0]
        }
        return null
    }

    sleep(ms: number): Promise<void> {
        return new Promise<void>((resolve) => setTimeout(resolve, ms))
    }

    async joinRandomRoom(req: any): Promise<Room> {
        const userMe = await this.userRepository.findOneBy({ id: req.user.id })
        if (!userMe) {
            throw new Error('User not found')
        }
        const myId = userMe.id

        if (userMe.status === 'playing') {
            throw new Error('You are already playing')
        }

        this.userService.changeStatusPlaying(myId)

        let index: number = -1
        let i: number = 0
        while (i < 10 && index === -1) {
            index = this.rooms.findIndex((room) => room.player_two === 0)
            if (index !== -1) {
                this.rooms[index].player_two = myId
                // TODO  Call the game launching service
                return this.rooms[index]
            }
            console.log('searching room for', userMe.nickname)
            await this.sleep(1000)
            i++
        }
        console.log('no room found for', userMe.nickname)
        this.userService.changeStatusOnLine(myId)
    }
}
