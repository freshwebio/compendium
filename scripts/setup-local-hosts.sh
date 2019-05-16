#!/usr/bin/env bash

# For now only works for unix based systems.
if ! sudo grep -q "127.0.0.1 apydox.local" /etc/hosts; then
  echo "Adding hosts entry for apydox.local."
  sudo bash -c 'echo "# Start of apydox managed hosts" >> /etc/hosts'
  sudo bash -c 'echo "127.0.0.1 apydox.local" >> /etc/hosts'
  sudo bash -c 'echo "# End of apydox managed hosts" >> /etc/hosts'
fi

echo "
Installing nginx if it is not already installed"

if ! nginx -v 2>/dev/null; then
  echo "    About to install nginx"
  echo ""

  if [ "$(uname)" == "Darwin" ]; then
    # Install nginx for Mac OS X platform, only works if brew is installed.
    if brew -v; then
      brew install nginx
    fi
  elif [ "$((substr $(uname -s) 1 5))" == "Linux" ]; then
    # Install nginx for GNU/Linux platform, only ubuntu at the moment!
    sudo apt-get update
    sudo apt-get install nginx
  fi
else
  echo "    nginx is already installed"
fi


echo "
Configuring nginx proxy for apydox.local if it is not already configured."
if [ ! -f "/usr/local/etc/nginx/servers/apydox.conf" ]; then
  echo "    Adding nginx proxy config for apydox"
  export NGINX_APYDOX_CONFIG=$(cat <<-END
server {
    listen 80;
    server_name apydox.local;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl;
    server_name apydox.local;

    ssl_certificate $(pwd)/__apydox_local_certs/apydox.crt;
    ssl_certificate_key $(pwd)/__apydox_local_certs/apydox.key;
    ssl_protocols TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_ecdh_curve secp384r1; # Requires nginx >= 1.1.0
    ssl_session_timeout  10m;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off; # Requires nginx >= 1.5.9
    # ssl_stapling on; # Requires nginx >= 1.3.7
    # ssl_stapling_verify on; # Requires nginx => 1.3.7
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;
    # Disable strict transport security for now. You can uncomment the following
    # line if you understand the implications.
    # add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    location / {
        proxy_pass https://localhost:5401;
    }

    location /sockjs-node {
        proxy_pass https://localhost:5401;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Access-Control-Allow-Origin *;
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
END
)
  sudo -E bash -c 'echo "$NGINX_APYDOX_CONFIG" >> /usr/local/etc/nginx/servers/apydox.conf'
else
  echo "    nginx proxy has already been configured"
fi

echo "
Reloading nginx ...
"
sudo nginx -s reload || sudo nginx