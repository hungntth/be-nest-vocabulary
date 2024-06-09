import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.use(helmet());
  app.use(compression());

  app.setGlobalPrefix('api/v1');
  app.useStaticAssets(join(__dirname, '..', 'mp3'), {
    prefix: '/public/mp3'
  });


  await app.listen(process.env.PORT);

  console.log(`App running port ${process.env.PORT}`);
  console.log(
    `Mongoo connection:::`,
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_PARAMS}`,
  );
}
bootstrap();
