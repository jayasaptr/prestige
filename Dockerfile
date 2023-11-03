FROM node:latest

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . ./

RUN npm install typescript

RUN npx prisma generate

CMD ["npm","start"]

EXPOSE 5000
