export interface IRMessage {
  sender: string;
  receiver: string[];
  text: string;
  media?: string;
}