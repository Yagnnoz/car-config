FROM node:18.18-alpine as build
WORKDIR /usr/local/app

COPY . /usr/local/app/

RUN npm ci

RUN npm run build

## Stage 2

FROM nginx:1.25.2-alpine

COPY --from=build /usr/local/app/dist/tesla-configurator/browser /usr/share/nginx/html
COPY --from=build /usr/local/app/nginx-config/default.conf /etc/nginx/conf.d

RUN rm /usr/share/nginx/html/mockServiceWorker.js

EXPOSE 80
