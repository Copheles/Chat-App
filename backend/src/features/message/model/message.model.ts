import mongoose, { Document, Model, Types } from 'mongoose';

export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  sender: Types.ObjectId;
  text: string;
  media: string;
  receiver: Types.ObjectId[];
  seenBy: Types.ObjectId[];
  isDeleted: boolean;
  createdAt?: Date;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String
    },
    media: {
      type: String
    },
    receiver: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Message: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
