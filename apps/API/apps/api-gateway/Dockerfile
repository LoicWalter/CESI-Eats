FROM node:alpine As development

WORKDIR /usr/src/app

RUN npm install -g pnpm@9.1.2 @nestjs/cli

COPY . .

RUN pnpm install

RUN pnpm run generate

RUN pnpm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN npm install -g pnpm@9.1.2 @nestjs/cli

COPY package*.json ./

RUN pnpm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

RUN pnpm run generate

CMD ["node", "dist/apps/auth-service/main.js"]