import * as Joi from 'joi';
import { Env } from './env';

export const SCHEMA = Joi.object<Env, true>({
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
});
