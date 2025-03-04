FROM node:20-alpine
WORKDIR /app
RUN npm i npm@latest -g
COPY package*.json  ./
RUN npm ci
COPY . ./
EXPOSE 3000
RUN npm run build
CMD ["node", "/app/dist/src/main.js"]