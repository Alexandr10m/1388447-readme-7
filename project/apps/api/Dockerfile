FROM node:20.18-alpine
WORKDIR /opt/readme-api
COPY ./dist/apps/api/package.json/ .
RUN npm install --omit=dev
COPY ./dist/apps/api/ .
CMD ["node", "./main.js"]
