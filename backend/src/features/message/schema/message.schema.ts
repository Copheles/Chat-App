import Joi from "joi";

export const messageSendSchema = Joi.object({
  receiver: Joi.array().required(),
  text: Joi.string().required()
})