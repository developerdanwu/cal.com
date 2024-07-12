FROM node:18-alpine as build

ARG POSTGRES_URL_NON_POOLING
ARG POSTGRES_URL

WORKDIR /calcom

RUN set -eux;

ENV NODE_ENV="production"
ENV NODE_OPTIONS="--max-old-space-size=8192"
ENV POSTGRES_URL_NON_POOLING=${POSTGRES_URL_NON_POOLING}
ENV POSTGRES_URL=${POSTGRES_URL}

COPY . .

RUN yarn install

# Build prisma schema and make sure that it is linked to v2 node_modules
RUN yarn workspace @calcom/api-v2 run generate-schemas
RUN rm -rf apps/api/v2/node_modules
RUN yarn install

RUN yarn workspace @calcom/api-v2 run build

EXPOSE 80

CMD [ "yarn", "workspace", "@calcom/api-v2", "start:prod"]
