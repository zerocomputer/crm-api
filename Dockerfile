# Stage 1: Build
FROM node:22-slim AS build
WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -qq && apt-get install -y -qq --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code and prisma schema
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src/ src/
COPY prisma/ prisma/
COPY prisma.config.ts ./

# Generate Prisma client and build
RUN npx prisma generate && npm run build

# Stage 2: Production
FROM node:22-slim AS production
WORKDIR /app

RUN apt-get update -qq && apt-get install -y -qq --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy built artifacts
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./

# Create uploads directory
RUN mkdir -p /app/uploads

ENV NODE_ENV=production
EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/dashboard/stats', r => process.exit(r.statusCode >= 500 ? 1 : 0))" || exit 1

CMD ["node", "dist/main"]
