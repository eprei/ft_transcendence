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
    NotFoundException,
	InternalServerErrorException
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateChannelDto } from 'src/channel/dto/update-channel.dto'
import { Express } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { extname } from 'path'
import * as fs from 'fs'

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
    async getUser(@Request() req: any) {
        const user = await this.userService.findOne(req.user.id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        const { id, TFASecret, FT_id, ...rest } = user
        const userPosition = await this.userService.getUserRankingPosition(
            req.user.id
        )
        return { ...rest, userPosition }
    }

    @Get('nickname/:nickname')
    async getLambda(@Param('nickname') nickname: string) {
        return await this.userService.getLambdaInfo(nickname)
    }

	@Post('upload-profile-picture')
	@UseInterceptors(
	  FileInterceptor('profilePicture', {
		storage: diskStorage({
		  destination: './uploads/tmp-profil-pictures-storage', // Path where profile pictures will be temporary saved
		  filename: (req, file, cb) => {
			const uniqueSuffix = uuidv4() // A unique suffix is used to avoid naming conflicts
			const fileExt = extname(file.originalname)
			cb(null, `${Date.now()}-${uniqueSuffix}${fileExt}`)
		  },
		}),
	  }),
	)
	async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
		if (!file) {
		  // Error handling if no file is provided
		  throw new BadRequestException('No image was provided')
		}

		// Destination path in the 'profile-images' volume
		const destinationPath = '/app/profile-images'

		// Generate a unique name for the file in the volume 'profile-images'
		const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`

		try {
		  // Read temporary file
		  const fileData = fs.readFileSync(file.path)

		  // Write the file to the path of the volume 'profile-images'.
		  fs.writeFileSync(`${destinationPath}/${uniqueFilename}`, fileData)

		  // Delete temporary file
		  fs.unlinkSync(file.path)

		  // Rest of the logic...

		  return { message: 'Profile image saved correctly' }
		} catch (error) {
		  // Error handling if a problem occurs while reading, writing or deleting the file
		  console.error('Error when moving profile image:', error)
		  throw new InternalServerErrorException('An error occurred when saving the profile image')
		}
	  }
}
