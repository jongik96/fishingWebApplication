# # # vue.js 프론트 빌드만을 위해 node 이미지를 사용하여 작업하는 과정 
# # ### vue.js 빌드만을 위한 node 이미지를 사용 
# # ### 작업 디렉토리를 /hompage로 설정한 후, 
# # ### 패키지 설치를 위해 package.json을 작업 디렉토리로 옮긴 후 설치 
# # ### 나머지 프론트 소스코드와 리소스를 복사하여 빌드 진행  
# # FROM node:12.2.0-alpine as build-stage 
# # WORKDIR /app
# # COPY ./package*.json ./ 

# # RUN npm install 
# # COPY . . 
# # RUN npm run build 

# # # 빌드한 프론트 결과물을 nginx 이미지에 옮겨서 실행하는 과정 
# # ### 필요없는 기존 conf 문서를 삭제하고, nginx에 설정하기 위한 conf를 복사 
# # ### build-stage(=상위 node 이미지)에서 빌드한 결과물을 nginx로 옮긴 후, 
# # ### 80번 포트 개방과 "nginx -g daemon off;" 명령을 실행 
# # FROM nginx:latest as production-stage 

# # COPY ./app.conf /etc/nginx/conf.d/app.conf
# # COPY --from=build-stage ./app/build /usr/share/nginx/html/app
# # EXPOSE 80 
# # CMD ["npm", "run", "start:prod"]


# # # Install dependencies only when needed
# # FROM node:alpine AS deps
# # # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# # RUN apk add --no-cache libc6-compat
# # WORKDIR /app
# # COPY package.json yarn.lock ./
# # # RUN yarn install --frozen-lockfile
# # RUN yarn install


# # # Rebuild the source code only when needed
# # FROM node:alpine AS builder
# # WORKDIR /app
# # COPY . .
# # COPY --from=deps /app/node_modules ./node_modules
# # RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# # # Production image, copy all the files and run next
# # FROM node:alpine AS runner
# # WORKDIR /app

# # ENV NODE_ENV production

# # RUN addgroup -g 1001 -S nodejs
# # RUN adduser -S nextjs -u 1001

# # # You only need to copy next.config.js if you are NOT using the default configuration
# # COPY --from=builder /app/next.config.js ./
# # COPY --from=builder /app/public ./public
# # COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# # COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder /app/package.json ./package.json


# # USER nextjs

# # EXPOSE 80 443 3000

# # # Next.js collects completely anonymous telemetry data about general usage.
# # # Learn more here: https://nextjs.org/telemetry
# # # Uncomment the following line in case you want to disable telemetry.
# # # ENV NEXT_TELEMETRY_DISABLED 1

# # CMD ["next", "build"]
# # CMD ["yarn", "start"]

# # Base on offical Node.js Alpine image
# FROM node:12.2.0-alpine as build-stage 

# # Set working directory
# WORKDIR /usr/app

# # Copy package.json and package-lock.json before other files
# # Utilise Docker cache to save re-installing dependencies if unchanged
# COPY ./package*.json ./

# # Install dependencies
# RUN npm install --production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
# USER nextjs

# # RUN npm install 

# # Copy all files
# COPY . .

# CMD ["npx", "next", "build" ]
# # Build app
# # RUN npm run build

# # Expose the listening port

# # Run container as non-root (unprivileged) user
# # The node user is provided in the Node.js Alpine base image

# # Run npm start script when container starts


# # # nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
# FROM nginx:stable-alpine as production-stage

# RUN rm /etc/nginx/conf.d/default.conf

# COPY ./nginx/homepage.conf /etc/nginx/conf.d/homepage.conf

# COPY --from=build-stage --chown=nextjs:nodejs ./usr/app/.next /usr/share/nginx/html/homepage

# # 80 포트 오픈
# EXPOSE 80 443

# # container 실행 시 자동으로 실행할 command. nginx 시작함
# CMD ["nginx", "-g", "daemon off;"]

# # # root 에 app 폴더를 생성
# # RUN mkdir /app

# # # work dir 고정
# # WORKDIR /app

# # # work dir 에 build 폴더 생성 /app/build
# # RUN mkdir ./build

# # # host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
# # ADD ./build ./build

# # # nginx 의 default.conf 를 삭제
# # RUN rm /etc/nginx/conf.d/default.conf

# # host pc 의 nginx.conf 를 아래 경로에 복사
# # COPY ./nginx/homepage.conf /etc/nginx/conf.d 



# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
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

FROM nginx:latest as production-stage

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/homepage.conf /etc/nginx/conf.d/homepage.conf

COPY --from=builder /app/.next /usr/share/nginx/html/app

# 80 포트 오픈
EXPOSE 80 443 3000

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]
