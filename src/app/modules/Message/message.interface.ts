import { ObjectId } from "mongoose";

export interface TMessage {
  id: string;
  sender: ObjectId;
  content: string;
  chatRoom: ObjectId;
  readBy: ObjectId[];
  receiverId: ObjectId;
}


// sender: {
//     type: mongoose.Schema.Types.ObjectId;
//     ref: 'User';
//     required: true;
//   };
//   content: {
//     type: string;
//     required: true;
//   };
//   chatRoom: {
//     type: mongoose.Schema.Types.ObjectId;
//     ref: 'ChatRoom';
//     required: true;
//   };
//   readBy: [
//     {
//       type: mongoose.Schema.Types.ObjectId;
//       ref: 'User';
//     },
//   ];