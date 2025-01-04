import { Application, Request, Response } from 'express';
import authRoute from '~/features/user/route/auth.route';
import userRoute from '~/features/user/route/user.route';
import conversationRoute from '~/features/conversation/route/conversation.route';

const appRoutes = (app: Application) => {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      message: 'hello'
    });
  });
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/conversations', conversationRoute);
};

export default appRoutes;
