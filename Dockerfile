FROM node:20.11.1-alpine3.19

WORKDIR /app

ADD build build/

ENV PORT=80

ENV TARGET_ENV=prod

CMD ["npm", "start"]