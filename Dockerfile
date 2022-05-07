FROM node:14-slim

WORKDIR /app

ENV PORT 3000
ENV HOST 0.0.0.0
ENV NODE_OPTIONS='--max-old-space-size=1536'

COPY ./package.json /app
COPY ./yarn.lock /app

RUN apt-get update && \
    apt-get install -y git python make g++ yarn && \
    yarn install

COPY . /app

RUN yarn run build

EXPOSE ${PORT}

VOLUME [ "/app" ]

ENTRYPOINT [ "yarn", "start" ]
