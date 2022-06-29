## Description

API of the cloud service of photo-inbox app

## Setup

```bash
$ touch .env
# don't forget to update command below with a real token
$ echo 'GITHUB_TOKEN=[YOUR_TOKEN]' >> .env
$ npm install

$ docker compose up -d

$ npm run migrate:run

$ aws configure --profile localstack
# configure aws profile with following values
# aws_access_key_id = foobar
# aws_secret_access_key = foobar
$ aws s3api create-bucket --bucket photo-inbox --endpoint http://localhost:4566 --profile localstack --region eu-west-3
```

## Bundle

```bash
$ docker image build --tag 'photo-inbox/api:0.0.1' --secret id=env,src=.env .
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
