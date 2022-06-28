FROM node:alpine as build

WORKDIR /usr/src/app

# TODO unsecure way t opass credentials, use Docker secrets instead
ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as start

WORKDIR /usr/src/app

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN

COPY package*.json ./
COPY .npmrc ./

RUN npm install --only=production

COPY . .

COPY --from=build /usr/src/app/dist ./dist

CMD ["npm", "run", "start"]
