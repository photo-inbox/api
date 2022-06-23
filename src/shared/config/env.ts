export interface Env {
  NODE_ENV: NodeEnv;
  AWS_ENDPOINT: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
}

export enum NodeEnv {
  development = 'development',
  production = 'production',
}
