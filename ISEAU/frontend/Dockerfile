# # Install dependencies only when needed
# FROM node:alpine AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# # RUN mkdir -p /app

# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json yarn.lock ./
# # RUN yarn install --frozen-lockfile
# RUN yarn install

# # Rebuild the source code only when needed
# FROM node:alpine AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN npm config set unsafe-perm true
# RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# # Production image, copy all the files and run next
# FROM node:alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# # You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next /usr/share/nginx/html/app
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# USER nextjs

# FROM nginx:latest AS production-stage

# # RUN mkdir ./build

# # ADD /app/.next ./build

# RUN rm /etc/nginx/conf.d/default.conf

# COPY ./homepage.conf /etc/nginx/conf.d/homepage.conf

# COPY --from=builder /app/.next /usr/share/nginx/html/app

# # 80 포트 오픈
# EXPOSE 443 80

# # container 실행 시 자동으로 실행할 command. nginx 시작함
# CMD ["nginx", "-g", "daemon off;"]



#############################################
# Install dependencies only when needed
# FROM node:lts-alpine AS deps

# WORKDIR /opt/app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
# FROM node:lts-alpine AS builder

# ENV NODE_ENV=production
# WORKDIR /opt/app
# COPY . .
# COPY --from=deps /opt/app/node_modules ./node_modules
# RUN yarn build

# # Production image, copy all the files and run next
# FROM node:lts-alpine AS runner

# ARG X_TAG
# WORKDIR /opt/app
# ENV NODE_ENV=production
# COPY --from=builder /opt/app/next.config.js ./
# COPY --from=builder /opt/app/public ./public
# COPY --from=builder /opt/app/.next ./.next
# COPY --from=builder /opt/app/node_modules ./node_modules


# # FROM nginx:latest AS production-stage
# # RUN rm /etc/nginx/conf.d/default.conf
# # COPY ./homepage.conf /etc/nginx/conf.d/homepage.conf

# EXPOSE 443 80

# CMD ["node_modules/.bin/next", "start"]
# CMD ["nginx", "-g", "daemon off;"]

##############################
# FROM node:lts-alpine AS build-stage
# WORKDIR /app
# COPY package.json yarn.lock ./

# RUN yarn install 

# FROM node:lts-alpine AS builder
# ENV NODE_ENV=production
# WORKDIR /app
# COPY . .
# COPY --from=build-stage /app/node_modules ./node_modules
# RUN yarn build

# FROM node:lts-alpine AS runner
# ARG X_TAG
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# CMD ["node_modules/.bin/next", "start"]

# FROM nginx:latest as production-stage 

# COPY ./homepage.conf /etc/nginx/conf.d/homepage.conf
# COPY --from=build-stage ./app /usr/share/nginx/html/app
# EXPOSE 80 
# CMD ["nginx", "-g", "daemon off;"]
#################################
# build react app, it should be /build
# FROM node:12.2.0-alpine as build
# FROM node:lts-alpine as build
# WORKDIR /app
# COPY package.json /app/package.json
# # RUN npm install --only=prod
# RUN yarn install --only=prod
# COPY . /app
# # RUN npm run build
# RUN yarn build

# # Creating nginx image and copy build folder from above
# # FROM nginx:1.16.0-alpine
# FROM nginx:stable-alpine
# RUN mkdir /usr/share/nginx/buffer
# COPY --from=build /app/.next /usr/share/nginx/buffer
# COPY --from=build /app/deploy.sh /usr/share/nginx/buffer
# RUN chmod +x /usr/share/nginx/buffer/deploy.sh
# RUN cd /usr/share/nginx/buffer && ./deploy.sh
# RUN mkdir /usr/share/nginx/log
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80 443
# CMD ["nginx", "-g", "daemon off;"]
#################################
# Base on offical Node.js Alpine image
FROM node:latest as builder

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files
COPY ./ ./
# Build app
RUN yarn build

# remove development dependencies
RUN yarn install --production

####################################################### 

FROM nginx:alpine

WORKDIR /usr/app

RUN apk add nodejs-current npm supervisor
RUN mkdir mkdir -p /var/log/supervisor && mkdir -p /etc/supervisor/conf.d

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy nginx config files
# *.conf files in conf.d/ dir get included in main config
COPY ./.nginx/default.conf /etc/nginx/conf.d/

# COPY package.json next.config.js .env* ./
# COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/node_modules ./node_modules

# supervisor base configuration
ADD supervisor.conf /etc/supervisor.conf

# replace $PORT in nginx config (provided by executior) and start supervisord (run nextjs and nginx)
CMD sed -i -e 's/$PORT/80/g' /etc/nginx/conf.d/default.conf && \
  supervisord -c /etc/supervisor.conf