FROM node:18

# Atualiza e instala whois, traceroute, dig, host e nslookup
RUN apt-get update && \
    apt-get install -y whois traceroute dnsutils bind9-host && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
