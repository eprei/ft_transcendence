import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import * as passport from 'passport'
import * as crypto from 'crypto'

const generateSessionSecret = () => {
    const secretLength = 32 // Secret length in bytes
    return crypto.randomBytes(secretLength).toString('hex')
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('api')

    app.enableCors({
        origin: 'http://localhost:4040',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Cookie, Set-Cookie',
        credentials: true,
    })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    )

    app.use(
        session({
            secret: generateSessionSecret(),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000,
                sameSite: 'lax',
                httpOnly: true,
                secure: false,
                path: '/',
            },
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())
    app.use((req, res, next) => {
        console.log("Session id: ", req.sessionID)
        next()
    })

	const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

    await app.listen(3000)
}

bootstrap().catch((error) => console.error(error))
