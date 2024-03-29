
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:18-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG REDIS_URL $REDIS_URL
ARG NEXT_PUBLIC_AUTH0_CLIENT_ID $NEXT_PUBLIC_AUTH0_CLIENT_ID
ARG NEXT_PUBLIC_AUTH0_DOMAIN $NEXT_PUBLIC_AUTH0_DOMAIN
ARG NEXT_PUBLIC_AUTH0_ADMIN_EMAIL $NEXT_PUBLIC_AUTH0_ADMIN_EMAIL

RUN sed -i "s|REDIS_URL=|REDIS_URL=$REDIS_URL|g" .env.production
RUN sed -i "s|NEXT_PUBLIC_AUTH0_CLIENT_ID=|NEXT_PUBLIC_AUTH0_CLIENT_ID=$NEXT_PUBLIC_AUTH0_CLIENT_ID|g" .env.production
RUN sed -i "s|NEXT_PUBLIC_AUTH0_DOMAIN=|NEXT_PUBLIC_AUTH0_DOMAIN=$NEXT_PUBLIC_AUTH0_DOMAIN|g" .env.production
RUN sed -i "s|NEXT_PUBLIC_AUTH0_ADMIN_EMAIL=|NEXT_PUBLIC_AUTH0_ADMIN_EMAIL=$NEXT_PUBLIC_AUTH0_ADMIN_EMAIL|g" .env.production

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build
RUN ls

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ARG REDIS_URL
ARG NEXT_PUBLIC_AUTH0_CLIENT_ID
ARG NEXT_PUBLIC_AUTH0_DOMAIN
ARG NEXT_PUBLIC_AUTH0_ADMIN_EMAIL

ENV REDIS_URL $REDIS_URL
ENV NEXT_PUBLIC_AUTH0_CLIENT_ID $NEXT_PUBLIC_AUTH0_CLIENT_ID
ENV NEXT_PUBLIC_AUTH0_DOMAIN $NEXT_PUBLIC_AUTH0_DOMAIN
ENV NEXT_PUBLIC_AUTH0_ADMIN_EMAIL $NEXT_PUBLIC_AUTH0_ADMIN_EMAIL

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/next.config.js next.config.js

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]