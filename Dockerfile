FROM node:latest

RUN apt-get update && apt-get upgrade -y

WORKDIR /app

COPY . .

RUN npm i --force

RUN npm run build

CMD ["npm", "run", "start"]
