import { Types } from 'mongoose';
export class CreateVocabularyDto {
  name: string;
  meaning: string;
  chapterId: string | Types.ObjectId;
}
