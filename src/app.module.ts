import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChaptersModule } from './chapters/chapters.module';
import configuration from './config/configuration';
import { VocabulariesModule } from './vocabulary/vocabularies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ChaptersModule,
    VocabulariesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
