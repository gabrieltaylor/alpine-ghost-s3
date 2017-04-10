FROM node:4-alpine

ENV GHOST_VERSION 0.11.7
ENV GHOST_USER ghost

RUN apk update && \
  apk upgrade && \
  apk add --no-cache --virtual .build-deps \
    ca-certificates \
    gcc \
    make \
    openssl \
    python \
    unzip \
  ; \
  apk add --update --repository http://dl-cdn.alpinelinux.org/alpine/edge/main nodejs-lts && \
  adduser -D -s /bin/bash $GHOST_USER && \
  wget -O ghost.zip "https://github.com/TryGhost/Ghost/releases/download/${GHOST_VERSION}/Ghost-${GHOST_VERSION}.zip"; \
  unzip ghost.zip; \
  npm install --production && \
  npm install --save ghost-s3-compat && \
  rm ghost.zip && \
  npm cache clean && \
  chown -R $GHOST_USER:$GHOST_USER /content && \
  apk del curl unzip && \
  rm -rf /tmp/*

COPY config.js /config.js
COPY index.js /content/storage/ghost-s3/index.js

USER $GHOST_USER
EXPOSE 2368

CMD ["npm", "start", "--production"]
