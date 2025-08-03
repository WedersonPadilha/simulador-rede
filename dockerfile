FROM node:18

# Atualiza e instala whois e traceroute
RUN apt-get update && apt-get install -y whois traceroute

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
