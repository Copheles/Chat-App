import { NextFunction, Request, Response } from 'express';
import { conversationService } from '~/services/db/conversation.service';

export class ConversationController {
  public async create(req: Request, res: Response, next: NextFunction) {
    const conversation = await conversationService.create(req.body);

    res.status(201).json({
      message: 'Conversation created!',
      data: conversation
    });
  }

  public async getUserRelatedConverstions(req: Request, res: Response, next: NextFunction) {
    const conversations = await conversationService.getRelatedConversations(req.currentUser, req);

    res.status(201).json({
      message: 'Get conversations!',
      ...conversations
    });
  }
}

export const conversationController: ConversationController = new ConversationController();
