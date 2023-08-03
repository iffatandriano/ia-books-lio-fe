FROM node:18-alpine

WORKDIR /client

COPY . .
COPY .env.example .env

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm","run", "start"]