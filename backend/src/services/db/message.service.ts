import { IMessage } from '~/features/message/interface/message.interface';
import { conversationService } from './conversation.service';
import Message from '~/features/message/model/message.model';
import { Types } from 'mongoose';
import { NotFoundException } from '~/globals/middleware/errror.middleware';
import { getPaginatedResults } from '~/globals/helpers/paginatedResults';
import { Request } from 'express';

class MessageService {
  public async sendMessage(conversationId: string, requestBody: IMessage, currentUser: UserPayload) {
    const { text, receiver } = requestBody; // `receiver` is an array
    const sender = currentUser.id;

    // Combine sender and receivers into a members array and remove duplicates
    const members = Array.from(new Set([sender, ...receiver]));
    const isGroup = members.length > 2;

    // Find an existing conversation with the exact same members
    let conversation = await conversationService.findConversationById(conversationId);

    if (!conversation) {
      // Create a new conversation with the members
      conversation = await conversationService.create({ members, isGroup });
    }

    // Create the new message in the conversation
    const newMessage = await Message.create({
      conversationId: conversation._id,
      sender,
      text,
      receiver
    });

    // Update the conversation's last message
    conversation.lastMessage = newMessage._id as Types.ObjectId;

    await conversation.save();

    return newMessage;
  }

  public async getMessages(conversationId: string, req: Request) {
    const conversation = await conversationService.findConversationById(conversationId);

    if (!conversation) {
      throw new NotFoundException(`Conversation with id:${conversationId} not found!`);
    }

    const result = await getPaginatedResults(Message, req, {
      additionalFilters: {
        conversationId: conversation._id
      }
    })

    return result;
  }
}

export const messageService: MessageService = new MessageService();
