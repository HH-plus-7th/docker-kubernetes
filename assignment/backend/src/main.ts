import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { loadConfig } from './common/config';

async function bootstrap() {
  const config = loadConfig();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  app.enableCors({
    origin: config.clientOrigin,
    credentials: true
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Storefront Challenge API')
    .setDescription('Black-box API for the frontend Docker communication challenge.')
    .setVersion('1.0.0')
    .addCookieAuth(config.cookieName)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs/openapi.json'
  });

  await app.listen(config.port);
}

bootstrap();
