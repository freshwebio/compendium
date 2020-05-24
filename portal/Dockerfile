FROM node:12.16.3-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN yarn --silent
COPY . /app
RUN chmod +x /app/scripts/start.sh
RUN apk update
RUN apk add nginx
RUN adduser -D -g 'www' www
RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["/bin/sh", "-c", "/app/scripts/start.sh"]
