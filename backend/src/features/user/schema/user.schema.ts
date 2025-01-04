import Joi from 'joi';

export const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).max(20).trim().required(),
  avatar: Joi.string().optional()
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
