FROM node:16 as dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn --quiet
RUN mv /usr/src/app/node_modules /usr/src/node_modules
COPY . .
ENV PORT=4200
EXPOSE 4200
CMD ["yarn","start"]