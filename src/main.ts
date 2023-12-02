import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CommonModule } from 'common.module';

async function bootstrap() {
  const app = await NestFactory.create(CommonModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Chat')
    .setDescription('Chat-Back')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey', // this should be apiKey
        name: 'access-token', // this is the name of the key you expect in header
        in: 'header',
      },
      'access-token', // this is the name to show and used in swagger
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(52423);
}
bootstrap();
