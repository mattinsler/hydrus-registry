FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package.json /usr/src/app/
RUN npm install --production
COPY . /usr/src/app/

EXPOSE 5000
CMD npm start
