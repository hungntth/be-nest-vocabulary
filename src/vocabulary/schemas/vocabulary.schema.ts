import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Chapter } from 'src/chapters/schemas/chapter.schema';

export type VocabularyDocument = HydratedDocument<Vocabulary>;

@Schema()
export class Vocabulary {
  @Prop()
  name: string;

  @Prop()
  meaning: string;

  @Prop({ default: '' })
  mp3Link: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' })
  chapterId: Chapter;
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);
