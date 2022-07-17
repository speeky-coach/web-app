// import { string } from '../../../framework/domain/types';

export type ConversationId = string;

export interface ConversationTime {
  seconds: string;
  nanos: number;
}

export interface Word {
  startsAt: ConversationTime;
  endsAt: ConversationTime;
  value: string;
  confidence: number;
}

export interface Paragraph {
  isTheUser: boolean;
  startsAt: ConversationTime;
  endsAt: ConversationTime;
  value: string;
  words: Word[];
}

export interface Transcription {
  paragraphs: Paragraph[];
}

interface Conversation {
  id: ConversationId;
  userId: string;
  filename: string;
  transcription?: Transcription;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default Conversation;
