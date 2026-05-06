FROM node:22-slim AS build
WORKDIR /app

RUN apt-get update -qq && apt-get install -y -qq --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY prisma/ prisma/
COPY prisma.config.ts ./

RUN npm ci

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src/ src/

RUN npx prisma generate && npm run build

FROM node:22-slim AS production
WORKDIR /app

RUN apt-get update -qq && apt-get install -y -qq --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./

RUN mkdir -p /app/uploads

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main"]
