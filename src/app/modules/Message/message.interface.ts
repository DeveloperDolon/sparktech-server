import { ObjectId } from "mongoose";

export interface TMessage {
  id: string;
  sender: string;
  content: string;
  chatRoom: string;
  readBy: ObjectId;
  receiverId: string;
  isSeen: boolean;
}
