# Use an official Node runtime as the base image
FROM node:18
ARG APP_PORT=30001
ARG GOOGLE_SERVICE_ACCOUNT_BASE64

# Set the environment variable APP_PORT
ENV APP_PORT=${APP_PORT}
ENV GOOGLE_SERVICE_ACCOUNT_BASE64=${GOOGLE_SERVICE_ACCOUNT_BASE64}
ENV LOG_FOLDER=/home/node/app/logs

RUN mkdir -p /home/node/app/node_modules \ 
  && mkdir -p ${LOG_FOLDER} \ 
  && chown -R node:node /home/node/app

# Set the working directory in the container to /app
WORKDIR /home/node/app

# Copy package.json and package-lock.json into the directory /app in the container
COPY package*.json ./

USER node

# Install all the dependencies
RUN yarn install

# Copy the rest of your app's source code from your host to your image filesystem
RUN  mkdir -p res/keys
RUN echo APP_PORT=${APP_PORT} >> /home/node/app/.env
RUN if [ ! -f /home/node/app/res/keys/google-service-account.json ]; then \
  echo ${GOOGLE_SERVICE_ACCOUNT_BASE64} | base64 --decode > /home/node/app/res/keys/google-service-account.json; \
  fi

# If you are building your code for production
# RUN npm ci --only=production

# USER root

# Bundle app source inside the docker image
COPY --chown=node:node . .

# Change ownership of /home/node/app directory to appuser
# RUN chown -R node:node /home/node/app

# USER appuser

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE ${APP_PORT}

# Define the command to run your app using CMD which defines your runtime
CMD [ "yarn", "run", "start" ]