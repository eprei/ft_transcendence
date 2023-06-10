import { Test, TestingModule } from '@nestjs/testing'
import { SpeudoService } from './speudo.service'

describe('SpeudoService', () => {
    let service: SpeudoService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SpeudoService],
        }).compile()

        service = module.get<SpeudoService>(SpeudoService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
