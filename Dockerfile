FROM node:lts-alpine3.15 AS build-stage
WORKDIR /app
COPY . /app


RUN npm install --save --legacy-peer-deps
COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine-slim AS production-stage
COPY nginx-preconfig.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN chmod -x+X /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]