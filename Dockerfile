FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install


# Install TypeScript compiler globally
RUN npm install -g typescript

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
