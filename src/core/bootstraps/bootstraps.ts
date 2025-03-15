import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { json, urlencoded } from 'express';
import { AppModule } from '~app.module';
import { corsConfig } from '~config/cors.config';
import { env } from '~config/env.config';
import { trimDataConfig } from '~config/trim-data.config';
import { validationConfig } from '~config/validation.config';
import * as express from 'express'; 
import { join } from 'path';

export class Bootstrap {
    private app: INestApplication;
    

    async initApp(): Promise<void> {
        this.app = await NestFactory.create<NestExpressApplication>(AppModule);
        this.app.use(
            urlencoded({
                extended: true,
            })
        );
        useContainer(this.app.select(AppModule), { fallbackOnErrors: true });

        this.app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
        console.log('Serving static files from:', join(__dirname, '..', 'uploads'));
    }

    initCors(): void {
        this.app.enableCors(corsConfig);
    }

    initSwagger(): void {
        const config = new DocumentBuilder()
            .setTitle('Video Protection')
            .setDescription('The Video Protection API description')
            .setVersion('3.1.0')
            .addBearerAuth()
            .build();

        const document = SwaggerModule.createDocument(this.app, config);
        SwaggerModule.setup('documents', this.app, document);
    }

    initPipes(): void {
        this.app.useGlobalPipes(trimDataConfig);
        this.app.useGlobalPipes(validationConfig);
    }

    async start(): Promise<void> {
        await this.app.listen(env.APP_PORT);
    }
}
