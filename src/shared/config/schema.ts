import * as Joi from 'joi';
import { Env, NodeEnv } from './env';

export const SCHEMA = Joi.object<Env, true>({
  NODE_ENV: Joi.string().valid(...Object.values(NodeEnv)),

  AWS_ENDPOINT: Joi.string().when('NODE_ENV', {
    is: NodeEnv.production,
    then: Joi.optional(),
    otherwise: Joi.optional().default('http://localhost:4566'),
  }),
  AWS_ACCESS_KEY_ID: Joi.string().when('NODE_ENV', {
    is: NodeEnv.production,
    then: Joi.required(),
    otherwise: Joi.optional().default('foobar'),
  }),
  AWS_SECRET_ACCESS_KEY: Joi.string().when('NODE_ENV', {
    is: NodeEnv.production,
    then: Joi.required(),
    otherwise: Joi.optional().default('foobar'),
  }),
  AWS_REGION: Joi.string().when('NODE_ENV', {
    is: NodeEnv.production,
    then: Joi.required(),
    otherwise: Joi.optional().default('eu-west-3'),
  }),

  TYPEORM_HOST: Joi.string().when('NODE_ENV', {
    is: NodeEnv.production,
    then: Joi.required(),
    otherwise: Joi.optional().default('localhost'),
  }),
  TYPEORM_PORT: Joi.number().optional().default(5432),
  TYPEORM_USERNAME: Joi.string().when('NODE_ENV', {
    is: NodeEnv.production,
    then: Joi.required(),
    otherwise: Joi.optional().default('postgres'),
  }),
  TYPEORM_PASSWORD: Joi.string().when('NODE_ENV', {
    is: NodeEnv.production,
    then: Joi.required(),
    otherwise: Joi.optional().default('foobar'),
  }),
  TYPEORM_DATABASE: Joi.string().optional().default('photo-inbox'),
});
