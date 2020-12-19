FROM node:12.18.3

MAINTAINER MINCHANGGYOENG

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm install .
RUN npm install pm2 -g
RUN pm2 install typescript
EXPOSE 4000
EXPOSE 5432
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
