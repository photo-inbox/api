import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Env, SCHEMA } from '../src/shared';
import { ItemEntity } from './entities';
import {
  AddLabelToItems1656570911463,
  CreateItems1656570489076,
} from './migrations';

const env: Env = (() => {
  const { parsed } = dotenv.config();
  const { value } = SCHEMA.validate(parsed);
  return value;
})();

export default new DataSource({
  type: 'postgres',
  host: env.TYPEORM_HOST,
  port: env.TYPEORM_PORT,
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,
  entities: [ItemEntity],
  migrations: [CreateItems1656570489076, AddLabelToItems1656570911463],
});
