FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY package.json package.json

ADD migrations migrations/

ADD build build/

ENV PORT=80

ENV TARGET_ENV=prod

CMD ["npm", "start"]