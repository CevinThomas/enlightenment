FROM node:latest

ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.1.1"
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

WORKDIR /app

COPY package*.json app.json ./

RUN npm install expo-cli

RUN npm install

COPY . .

CMD ["npm", "start"]
