# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

RUN useradd -m node

USER node

# Copy package.json and package-lock.json into the directory /app in the container
COPY package*.json ./

# Install all the dependencies
RUN node install

# If you are building your code for production
# RUN npm ci --only=production

USER root

# Bundle app source inside the docker image
COPY . .

# Change ownership of /app directory to appuser
RUN chown -R node:node /app

USER node

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "run", "start" ]