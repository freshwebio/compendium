#!/bin/sh

yarn build
cp -r /app/build /usr/share/nginx/html
nginx -g 'daemon off;'
