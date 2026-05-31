import { HttpStatus, INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import * as ContextStore from 'request-context';
import { AppModule } from './app.module';
import { ENVIRONMENT, isDevelopmentEnvironment } from './constants';
import { validationPipe } from './shared/infrastructure/pipes/options.validation.pipe';
import { setApplicationInsights } from './app-insights';

function swaggerSetup(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('API')
        .setDescription('Starter API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
    Logger.log('Swagger configured');
}

async function bootstrap() {
    setApplicationInsights();

    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.use(ContextStore.middleware('request'));
    app.use((req: Request, _res: Response, next: NextFunction) => {
        const headerId = req.headers['x-request-id'];
        const requestId = typeof headerId === 'string' ? headerId : randomUUID();
        ContextStore.set('requestId', requestId);
        next();
    });

    app.use(helmet({ hsts: true }));
    app.useGlobalPipes(validationPipe);

    const nodeEnv = configService.get('NODE_ENV') || ENVIRONMENT.LOCAL;

    if (isDevelopmentEnvironment(nodeEnv)) {
        app.enableCors({
            origin: '*',
            credentials: true,
        });

        swaggerSetup(app);
    } else {
        app.enableCors({
            origin: [
                configService.get('FRONT_URL') || '',
                configService.get('EXTRA_ALLOWED_ORIGIN') || '',
            ].filter(Boolean),
            optionsSuccessStatus: HttpStatus.OK,
        });
    }

    const serverPort = configService.get('PORT') || 3020;

    await app.listen(serverPort);
    Logger.log(`Server start on port: ${serverPort}`);
}

void bootstrap();
