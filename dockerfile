FROM node:18-alpine3.17
RUN npm install -g npm@9.8.1
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
RUN apk add chromium
USER node
WORKDIR /app
CMD npm start