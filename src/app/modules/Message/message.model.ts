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
    },
    content: {
      type: String,
      required: true,
    },
    chatRoom: {
      type: String,
      required: true,
    },
    readBy: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const Message = model<TMessage>('Message', messageSchema);
