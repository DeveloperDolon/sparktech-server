
export interface TMessage {
  id: string;
  sender: string;
  content: string;
  chatRoom: string;
  readBy: string[];
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