import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    Res,
    Request,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateChannelDto } from 'src/channel/dto/update-channel.dto'
import { Express } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { UpdateNicknameDto } from './dto/update-nickname.dto'
import { UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard'
import { v4 as uuidv4 } from 'uuid'
import { extname } from 'path'
import { Response } from 'express'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto)
        return user
    }

    @Get()
    async findAll() {
        const users = await this.userService.findAll()
        return users
    }

    @Get('id/:id')
    async findOne(@Param('id') id: string) {
        const user = await this.userService.findOne(+id)
        return user
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateChannelDto: UpdateChannelDto
    ) {
        const user = await this.userService.update(+id, updateChannelDto)
        return user
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const user = await this.userService.remove(+id)
        return user
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const name = file.originalname.split('.')[0]
                    const fileExtension = file.originalname.split('.')[1]
                    const newFileName =
                        name.split(' ').join('_') +
                        '_' +
                        Date.now() +
                        '.' +
                        fileExtension

                    cb(null, newFileName)
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                    return cb(null, false)
                }
                cb(null, true)
            },
        })
    )
    uploadPhoto(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is not an image')
        }
        const response = {
            filePath: `http://localhost:8080/api/user/picture/${file.filename}`,
        }

        return response
    }

    @Get('picture/:filename')
    async getPhoto(@Param('filename') filename, @Res() res) {
        res.sendFile(filename, { root: './uploads' })
    }

    @Get('me')
    async getMyInfo(@Request() req: any) {
        return await this.userService.getMyInfo(req)
    }

    @Get('getmyfriends')
    async getMyFriends(@Request() req: any) {
        return await this.userService.getMyFriends(req)
    }

	@Get('getallnonfriendusers')
    async getOtherUsers(@Request() req: any) {
        return await this.userService.getAllNonFriendsUsers(req)
    }

    @Get('nickname/:nickname')
    @UseGuards(AuthenticatedGuard)
    async getLambda(@Param('nickname') nickname: string) {
        return await this.userService.getLambdaInfo(nickname)
    }

    @Post('updatenickname')
    async updateNickname(
        @Request() req: any,
        @Body() updateNicknameDto: UpdateNicknameDto
    ) {
        return await this.userService.updateNickname(req, updateNicknameDto)
    }

    @Post('logout')
    async logout(@Request() req: any, @Res() res: any) {
        return await this.userService.logout(req, res)
    }

    @Post('upload-profile-picture')
    @UseInterceptors(
        FileInterceptor('profilePicture', {
            storage: diskStorage({
                destination: './uploads/tmp-profil-pictures-storage', // Path where profile pictures will be temporary saved
                filename: (req, file, cb) => {
                    const uniqueSuffix = uuidv4()
                    const fileExt = extname(file.originalname)
                    cb(null, `${Date.now()}-${uniqueSuffix}${fileExt}`)
                },
            }),
        })
    )
    async uploadProfilePicture(
        @Request() req: any,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) {
            throw new BadRequestException('No image was provided')
        }

        const photoUrl = await this.userService.uploadProfilePicture(req, file)

        return { message: 'Profile image saved correctly', photoUrl }
    }

    @Get('profile-images/:filename')
    async serveProfileImage(
        @Param('filename') filename: string,
        @Res() res: Response
    ) {
        res.sendFile(filename, { root: '/app/profile-images' })
    }
}
