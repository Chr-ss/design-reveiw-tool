FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate

FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN chown -R nodejs:nodejs /app
USER nodejs
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]

FROM base AS build
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN chown -R nodejs:nodejs /app
USER nodejs
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
RUN chown -R nodejs:nodejs /app
USER nodejs
EXPOSE 3000
CMD ["npm", "run", "start", "--", "--hostname", "0.0.0.0"]
