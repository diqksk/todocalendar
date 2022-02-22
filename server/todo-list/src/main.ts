import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //entity에 없는 프로퍼티는 생략
      forbidNonWhitelisted: true, // dto에 정의된 프로퍼티가 들어오면 exception 발생
      transform: true, //받는 타입을 정의한 타입으로 자동 캐스팅
    }),
  );
  await app.listen(3000);
}
bootstrap();
