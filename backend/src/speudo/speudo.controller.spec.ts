import { Test, TestingModule } from '@nestjs/testing'
import { SpeudoController } from './speudo.controller'

describe('SpeudoController', () => {
    let controller: SpeudoController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SpeudoController],
        }).compile()

        controller = module.get<SpeudoController>(SpeudoController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
