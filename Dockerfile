# Image source: https://hub.docker.com/_/node/
FROM node:slim

# Create app directory
WORKDIR /app

# Bundle app source
COPY . /app

# Install app dependencies
RUN npm install

# Expose port
EXPOSE 4000

# Run app
CMD node server.js