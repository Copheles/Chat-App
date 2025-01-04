import express from 'express';
import { messageController } from '../controller/message.controller';
import { validateSchema } from '~/globals/middleware/validateSchema.middleware';
import { messageSendSchema } from '../schema/message.schema';
import { verifyUser } from '~/globals/middleware/auth.middleware';

const messageRoute = express.Router();

messageRoute.post('/', verifyUser, validateSchema(messageSendSchema), messageController.sendMessge);


export default messageRoute;
