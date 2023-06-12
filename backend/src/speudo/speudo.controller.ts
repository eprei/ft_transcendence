import { Controller, Get, Post, Body } from '@nestjs/common'

export class CreateSpeudo {
    speudo: string
}

@Controller('speudo')
export class SpeudoController {
    @Get()
    findAll(): string {
        return 'get on /speudo'
    }

    @Post()
    async create(@Body() newSpeudo: CreateSpeudo) {
        console.log(newSpeudo)
        return 'post on /speudo'
    }
}
