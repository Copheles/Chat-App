import Joi from 'joi';

export const conversaionCreateSchema = Joi.object({
  members: Joi.array().items(Joi.string().required()).min(2).required(),
  isGroup: Joi.bool()
});
