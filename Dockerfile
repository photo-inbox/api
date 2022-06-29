FROM node:alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY .npmrc ./

RUN --mount=type=secret,id=env source /run/secrets/env \
    npm install

COPY . .

RUN npm run build

FROM node:alpine as start

WORKDIR /usr/src/app

COPY package*.json ./
COPY .npmrc ./

RUN --mount=type=secret,id=env source /run/secrets/env \
    npm install --omit=dev

COPY . .

COPY --from=build /usr/src/app/dist ./dist

CMD ["npm", "run", "start"]
