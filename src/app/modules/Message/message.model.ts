import { ObjectId } from 'mongoose';
import { model, Schema } from 'mongoose';
import { TMessage } from './message.interface';
import { v4 as uuidv4 } from 'uuid';

const messageSchema = new Schema<TMessage>(
  {
    id: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    sender: {
      type: String,
      required: true,
      ref: 'User',
    },
    receiverId: {
      type: String,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    chatRoom: {
      type: String,
      ref: 'ChatRoom',
      required: true,
    },
    readBy: {
      type: String,
      default: null,
      ref: 'User',
    },
    isSeen:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  },
);

export const Message = model<TMessage>('Message', messageSchema);
