export interface IConversation {
  _id: string;
  lastMessage: ILastMessage;
  lastMessageDate: string;
  online?: boolean;
  read?: boolean;
  groupName?: string;
  groupAvatar?: string;
  createdAt?: string;
  updatedAt?: string;
  isGroup?: boolean;
  members: IMember[];
}

export interface IMember {
  _id: string;
  name: string;
  __v: number;
  avatar?: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILastMessage {
  conversationId: string;
  createdAt: string;
  isDeleted: boolean;
  receiver: string[];
  seenBy: string[];
  sender: string;
  text: string;
  updatedAt: string;
  _id: string;
  __v: number;
}
