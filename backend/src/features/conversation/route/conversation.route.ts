import express from 'express';
import { verifyUser } from '~/globals/middleware/auth.middleware';
import { validateSchema } from '~/globals/middleware/validateSchema.middleware';
import { conversaionCreateSchema } from '../schema/conversation.schema';
import { conversationController } from '../controller/conversation.controller';
import { messageSendSchema } from '~/features/message/schema/message.schema';
import { messageController } from '~/features/message/controller/message.controller';

const conversationRoute = express.Router();

conversationRoute.post('/', verifyUser, validateSchema(conversaionCreateSchema), conversationController.create);
conversationRoute.get('/', verifyUser, conversationController.getUserRelatedConverstions);
conversationRoute.post(
  '/:conversationId/messages',
  verifyUser,
  validateSchema(messageSendSchema),
  messageController.sendMessge
);
conversationRoute.get('/:conversationId/messages', verifyUser, messageController.getMessages);

export default conversationRoute;
