import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  BigInt.prototype['toJSON'] = function () {
    return this.toString();
  };
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Audio book API')
    .setDescription('Description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(5000);
}
bootstrap();
