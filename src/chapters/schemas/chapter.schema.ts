import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema()
export class Chapter {
  @Prop({ unique: true })
  chapterNo: number;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: '' })
  image: string;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
