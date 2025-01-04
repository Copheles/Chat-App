export interface IMessage {
  sender: string;
  receiver: string[];
  text: string;
  media?: string;
}