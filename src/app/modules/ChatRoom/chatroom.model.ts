import { model, Schema } from 'mongoose';
import { TChatRoom } from './chatroom.interface';
import { v4 as uuidv4 } from 'uuid';

const chatRoomSchema = new Schema<TChatRoom>(
  {
    id: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: false,
    },
    users: {
      type: [String],
      ref: 'User',
      required: true,
    },
    messages: [
      {
        type: String,
        ref: 'Message',
      },
    ],
    isGroup: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ChatRoom = model<TChatRoom>('ChatRoom', chatRoomSchema);
