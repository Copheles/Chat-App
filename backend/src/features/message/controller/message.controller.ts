import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '~/globals/constants/http';
import { messageService } from '~/services/db/message.service';

export class MessageController {
  public async sendMessge(req: Request, res: Response, next: NextFunction) {
    const message = await messageService.sendMessage(req.params.conversationId, req.body, req.currentUser);

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Message sent!',
      data: message
    });
  }

  public async getMessages(req: Request, res: Response, next: NextFunction) {
    const messages = await messageService.getMessages(req.params.conversationId, req);

    res.status(HTTP_STATUS.OK).json({
      message: "Get Messages",
      ...messages
    })
  }
}

export const messageController: MessageController = new MessageController();
