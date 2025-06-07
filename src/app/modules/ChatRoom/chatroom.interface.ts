import { ObjectId } from 'mongoose';

export interface TChatRoom {
  id: string;
  name: string;
  users: ObjectId[];
  messages: ObjectId[];
  isGroup: boolean;
}
