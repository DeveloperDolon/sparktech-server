import mongoose, { model, Schema } from 'mongoose';
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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
      required: true,
    },
    readBy: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Message = model<TMessage>('Message', messageSchema);
