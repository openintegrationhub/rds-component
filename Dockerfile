FROM node:16-alpine
LABEL NAME="rds-connector"
LABEL MAINTAINER Basaas GmbH "contact@basaas.com"
LABEL SUMMARY="This component allows to save the payload of a message into rds."

RUN apk --no-cache add \
    make \
    g++ \
    libc6-compat

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm i --production

COPY . /usr/src/app

RUN chown -R node:node .

USER node

ENTRYPOINT ["npm", "start"]