import { Controller, Get, Post, Body } from '@nestjs/common'
import { Speudo } from './../entity/Speudo'

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
        const newSpeudoToAdd = new Speudo()
        newSpeudoToAdd.speudo = newSpeudo.speudo
        newSpeudoToAdd.save()
        return 'post on /speudo'
    }
}
