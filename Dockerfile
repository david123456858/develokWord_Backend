FROM node:18-alpine

WORKDIR /app_develokWord

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm","run","dev" ]