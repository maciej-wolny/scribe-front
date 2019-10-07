FROM node:12.2.0

COPY package.json package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY public public
COPY src src

CMD ["npm", "start"]