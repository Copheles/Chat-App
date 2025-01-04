export interface IMessage {
  conversationId: string;
  isDeleted: boolean;
  createdAt: string;
  receiver: string[];
  seenBy: string[];
  sender: string;
  text: string;
  updatedAt: string;
  __v: number;
  _id: string;
}