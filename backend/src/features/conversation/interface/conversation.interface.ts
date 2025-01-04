export interface ICreateConversation {
  members: string[];
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  lastMessage?: string; 
}