FROM node:latest 

RUN mkdir /home/nodejs

COPY ./src/ /home/nodejs/src/
COPY ./public/ /home/nodejs/public/
COPY ./package.json /home/nodejs/

WORKDIR /home/nodejs/ 

RUN npm install

CMD [ "npm", "start" ]
