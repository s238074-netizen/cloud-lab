FROM node:20-alpine
WORKDIR /app/mern-demo
COPY mern-demo/package*.json ./
RUN npm install && npm install mongoose dotenv express cors
COPY mern-demo/ ./
EXPOSE 5000
CMD ["node", "server/server.js"]
