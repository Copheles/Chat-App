import express from 'express';
import { userLoginSchema, userRegisterSchema } from '../schema/user.schema';
import { validateSchema } from '~/globals/middleware/validateSchema.middleware';
import { authController } from '../controller/auth.controller';
import { verifyUser } from '~/globals/middleware/auth.middleware';

const authRoute = express.Router();

authRoute.post('/register', validateSchema(userRegisterSchema), authController.registerUser);
authRoute.post('/login', validateSchema(userLoginSchema), authController.loginUser);
authRoute.get('/')
authRoute.post('/logout', authController.logOut);

export default authRoute;
