import * as Joi from 'joi';

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});