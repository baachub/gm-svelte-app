FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN node node_modules/esbuild/install.js

EXPOSE 3000

CMD ["npm", "run", "dev"]