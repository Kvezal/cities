import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const { BACKEND_PORT, FRONTEND_PORT, FRONTEND_HOST, FRONTEND_PROTOCOL } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {
    credentials: true,
    origin: `${FRONTEND_PROTOCOL}://${FRONTEND_HOST}:${FRONTEND_PORT}`,
  }});
  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle(`Six cities`)
    .setDescription('Six cities API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(BACKEND_PORT);
}
bootstrap();
