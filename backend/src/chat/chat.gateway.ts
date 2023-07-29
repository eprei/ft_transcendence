import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { Server } from 'socket.io'
import { CreateMessageDto } from 'src/message/dto/create-message.dto'
import { CreateChannelDto } from 'src/channel/dto/create-channel.dto'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import { WebSocketServer } from '@nestjs/websockets'

type PasswordChangeData = [channelId: number, password: string]
type ChannelUserData = [channelId: number, userId: number]
type ChannelUserPassword = [channelId: number, userId: number, password: string]
type UserTargetData = [userId: number, targetId: number]
type UserTargetChannelData = [
    userId: number,
    targetId: number,
    channelId: number
]

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
    constructor(private readonly chatService: ChatService) {}

    @WebSocketServer()
    server: Server

    @SubscribeMessage('postMsg')
    @UsePipes(ValidationPipe)
    async postMsg(@MessageBody() createMessageDto: CreateMessageDto) {
        try {
            const msgSended = await this.chatService.newMsg(createMessageDto)
            this.server.emit('incomingMessage', msgSended)
        } catch (error) {
            console.log('Error while posting message')
        }
    }

    @SubscribeMessage('findAllMsgByChannel')
    async findAllMsgByChannel(@MessageBody() channelId: number) {
        try {
            const chanAllMsgs = await this.chatService.findAllMsgByChannel(
                channelId
            )
            return chanAllMsgs
        } catch (error) {
            console.log('Error while finding all messages by channel')
        }
    }

    @SubscribeMessage('findUsersByChannel')
    async findAllUsersByChannel(@MessageBody() channelId: number) {
        try {
            return await this.chatService.findUsersByChannel(channelId)
        } catch (error) {
            console.log('Error while finding users by channel')
        }
    }

    @SubscribeMessage('blockUser')
    async blockUser(@MessageBody() data: UserTargetData) {
        const [userId, targetId] = data
        try {
            await this.chatService.blockUser(userId, targetId)
            return { message: 'User blocked successfully' }
        } catch (error) {
            console.log('Failed to block user')
        }
    }

    @SubscribeMessage('unblockUser')
    async unblockUser(@MessageBody() data: UserTargetData) {
        const [userId, targetId] = data
        try {
            this.chatService.unblockUser(userId, targetId)
            return { message: 'User unblocked successfully' }
        } catch (error) {
            console.log('Failed to unblock user')
        }
    }

    @SubscribeMessage('getBlockedUsers')
    async getBlockedUsers(@MessageBody() myId: number) {
        try {
            return await this.chatService.getBlockedUsers(myId)
        } catch (error) {
            console.log('Failed to get blocked users')
        }
    }

    @SubscribeMessage('setAdmin')
    async setAdmin(@MessageBody() data: UserTargetChannelData) {
        const [userId, targetId, channelId] = data
        try {
            await this.chatService.setAdmin(userId, targetId, channelId)
            return { message: 'User is now admin' }
        } catch (error) {
            console.log('Failed to set admin')
        }
    }

    @SubscribeMessage('unsetAdmin')
    async unsetAdmin(@MessageBody() data: UserTargetChannelData) {
        const [userId, targetId, channelId] = data
        try {
            this.chatService.unsetAdmin(userId, targetId, channelId)
            return { message: 'User it is no longer admin' }
        } catch (error) {
            console.log('Failed to unset admin')
        }
    }

    @SubscribeMessage('kickUser')
    async kickUser(@MessageBody() data: UserTargetChannelData) {
        const [userId, targetId, channelId] = data
        try {
            this.chatService.kickUser(userId, targetId, channelId)
            return { message: 'User kicked successfully' }
        } catch (error) {
            console.log('Failed to kick user')
        }
    }

    @SubscribeMessage('banUser')
    async banUser(@MessageBody() data: UserTargetChannelData) {
        const [userId, targetId, channelId] = data
        try {
            this.chatService.banUser(userId, targetId, channelId)
            return { message: 'User banned successfully' }
        } catch (error) {
            console.log('Failed to ban user')
        }
    }

    @SubscribeMessage('unbanUser')
    async unbanUser(@MessageBody() data: UserTargetChannelData) {
        const [userId, targetId, channelId] = data
        try {
            this.chatService.unbanUser(userId, targetId, channelId)
            return { message: 'User unbanned successfully' }
        } catch (error) {
            console.log('Failed to unban user')
        }
    }

    @SubscribeMessage('getBannedUsers')
    async getBannedUsers(@MessageBody() channelId: number) {
        try {
            return await this.chatService.getBannedUsers(channelId)
        } catch (error) {
            console.log('Failed to get banned users')
        }
    }

    @SubscribeMessage('muteUser')
    async muteUser(@MessageBody() data: UserTargetChannelData) {
        const [userId, targetId, channelId] = data
        try {
            this.chatService.muteUser(userId, targetId, channelId)
            return { message: 'User muted successfully' }
        } catch (error) {
            console.log('Failed to mute user')
        }
    }

    @SubscribeMessage('getMutedUsers')
    async getMutedUsers(@MessageBody() channelId: number) {
        try {
            return await this.chatService.getMutedUsers(channelId)
        } catch (error) {
            console.log('Failed to get muted users')
        }
    }

    @SubscribeMessage('createNewChannel')
    @UsePipes(ValidationPipe)
    async createChannel(@MessageBody() createChannelDto: CreateChannelDto) {
        try {
            const channelCreated = await this.chatService.createChannel(
                createChannelDto
            )
            this.server.emit('newChannel', channelCreated)
        } catch (error) {
            console.log('Failed to create channel')
        }
    }

    @SubscribeMessage('createDM')
    @UsePipes(ValidationPipe)
    async createDirectChannel(@MessageBody() body: UserTargetData) {
        const [userId, targetId] = body
        const channel = await this.chatService.findChanDM(userId, targetId)
        this.server.emit('newChannel', channel)
        return channel
    }

    @SubscribeMessage('getAllChannels')
    @UsePipes(ValidationPipe)
    async getAllChannels() {
        try {
            return await this.chatService.getAllChannels()
        } catch (error) {
            console.log('Failed to get all channels')
        }
    }

    @SubscribeMessage('joinChannel')
    async joinChannel(@MessageBody() data: ChannelUserPassword) {
        const [channelId, userId, password] = data
        try {
            return await this.chatService.joinChannel(
                channelId,
                userId,
                password
            )
        } catch (error) {
            console.log('Failed to join Channel')
        }
    }

    @SubscribeMessage('leaveChannel')
    async leaveChannel(@MessageBody() data: ChannelUserData) {
        const [channelId, userId] = data
        try {
            return await this.chatService.leaveChannel(channelId, userId)
        } catch (error) {
            console.log('Failed to remove user from channel')
        }
    }
    @SubscribeMessage('deleteChannel')
    async deleteChannel(@MessageBody() data: ChannelUserData) {
        const [channelId, userId] = data
        try {
            return await this.chatService.deleteChannel(channelId, userId)
        } catch (error) {
            console.log('Failed to remove user from channel')
        }
    }

    @SubscribeMessage('changePassword')
    @UsePipes(ValidationPipe)
    async changeChannelPassword(@MessageBody() data: PasswordChangeData) {
        const [channelId, password] = data
        try {
            return await this.chatService.changePassword(channelId, password)
        } catch (error) {
            console.log('Failed to change password')
        }
    }
}
