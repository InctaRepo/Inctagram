FROM node:21.5 as dependencies
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM node:21.5 as builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
#ENV PATH /app/node_modules/.bin:$PATH
RUN pnpm build:production

FROM node:21.5 as runner
WORKDIR /app
RUN npm install -g pnpm
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["pnpm", "start"]
