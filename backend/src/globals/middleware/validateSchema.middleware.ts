import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationErrorItem } from 'joi';
import { HTTP_STATUS } from '../constants/http';

const formatJoiMessage = (joiMessages: ValidationErrorItem[]) => {
  return joiMessages.map((msgObj) => msgObj.message.replace(/['"]/g, ''));
};

export const validateSchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = formatJoiMessage(error.details);
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: message });
      return;
    }

    next()
  };
};
