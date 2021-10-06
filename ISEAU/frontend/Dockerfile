# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN mkdir -p /app

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile
RUN yarn install

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm config set unsafe-perm true
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

FROM nginx:latest AS production-stage

# RUN mkdir ./build

# ADD /app/.next ./build

RUN rm /etc/nginx/conf.d/default.conf
CMD ["cat", "homepage.conf"]
CMD ["pwd"]
CMD ["ls"]
COPY ./homepage.conf /etc/nginx/conf.d/homepage.conf

COPY --from=builder /app/.next /usr/share/nginx/html/app

# 80 포트 오픈
EXPOSE 443 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]
