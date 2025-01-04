import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IConversation extends Document {
  members: Types.ObjectId[];
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  lastMessage?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new mongoose.Schema<IConversation>(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    isGroup: {
      type: Boolean,
      default: false
    },
    groupName: {
      type: String
    },
    groupAvatar: {
      type: String
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  },
  {
    timestamps: true
  }
);


const Conversation: Model<IConversation> = mongoose.model<IConversation>('Conversation', conversationSchema);

export default Conversation;
