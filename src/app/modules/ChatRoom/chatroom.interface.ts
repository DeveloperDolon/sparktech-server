import { ObjectId } from 'mongoose';

export interface TChatRoom {
  id: string;
  name?: string;
  users: string[];
  messages: string[];
  isGroup: boolean;
}
