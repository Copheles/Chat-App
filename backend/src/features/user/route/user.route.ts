import express from 'express';
import { verifyUser } from '~/globals/middleware/auth.middleware';
import { userController } from '../controller/user.controller';

const userRoute = express.Router();

userRoute.get('/', verifyUser, userController.getAllUsers);
userRoute.get('/getMe', verifyUser, userController.getMe);

export default userRoute;
