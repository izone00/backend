# Stage 1
FROM node:18-alpine As development

USER node

WORKDIR /app

# RUN chown node:node /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .


# CMD [ "npm", "run", "start:dev" ]

# # Stage 2
# FROM node:18-alpine As build

# WORKDIR /app

# COPY --chown=node:node package*.json ./

# COPY --chown=node:node --from=development /app/node_modules ./node_modules

# COPY --chown=node:node . .

# RUN npm run build

# ENV NODE_ENV production

# RUN npm ci --only=production

# # Stage 3
# FROM node:18-alpine As production

# WORKDIR /app

# COPY --chown=node:node --from=build /app/node_modules ./node_modules
# COPY --chown=node:node --from=build /app/dist ./dist

# CMD [ "node", "dist/main.js" ]