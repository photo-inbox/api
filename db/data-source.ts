import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateItems1656261359684 } from './migrations';
import { Env, SCHEMA } from '../src/shared';

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
  migrations: [CreateItems1656261359684],
  migrationsRun: true,
});
