import { Request } from 'express';
import mongoose from 'mongoose';
import { ICreateConversation } from '~/features/conversation/interface/conversation.interface';
import Conversation, { IConversation } from '~/features/conversation/model/conversation.model';
import { getPaginatedResults } from '~/globals/helpers/paginatedResults';
import { BadRequestException } from '~/globals/middleware/errror.middleware';

class ConversationService {
  public async create(requestBody: ICreateConversation) {
    const { members, isGroup } = requestBody;

    let conversation = await this.findConversationByMembers(members, isGroup);

    if (conversation && isGroup === false) {
      throw new BadRequestException('Can not create another conversation.');
    }

    conversation = await Conversation.create({ members, isGroup });

    return conversation;
  }

  public async getRelatedConversations(currentUser: UserPayload, req: Request) {
    const result = await getPaginatedResults(
      Conversation,
      req,
      {
        populateFields: [
          {
            path: 'lastMessage'
          },
          {

            path: 'members'
          }
        ]
      },
      '-lastMessageDate'
    ); // Sort by lastMessage.createdAt in descending order

    return result;
  }

  public async findConversationById(id: string): Promise<IConversation | null> {
    const conversation: IConversation | null = await Conversation.findById(id);

    return conversation;
  }

  public async findConversationByMembers(members: string[], isGroup = false): Promise<IConversation | null> {
    const conversation = await Conversation.findOne({
      members: { $all: members, $size: members.length },
      isGroup
    });

    return conversation;
  }
}

export const conversationService: ConversationService = new ConversationService();
