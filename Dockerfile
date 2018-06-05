FROM node:latest

WORKDIR /usr/src/app
COPY package.json .
RUN npm install --global yarn
RUN yarn install

EXPOSE 3000
CMD ["npm", "start"]

COPY . .