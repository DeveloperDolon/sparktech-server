import { ObjectId } from "mongoose";

export interface TMessage {
  id: string;
  sender: ObjectId;
  content: string;
  chatRoom: ObjectId;
  readBy: ObjectId[];
  receiverId: ObjectId;
}
