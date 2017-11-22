FROM node:boron

RUN apt-get update -y
RUN apt-get install -y build-essential

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose express port
EXPOSE 8081

# Double check
RUN ls -la /usr/src/app

# Start
CMD [ "npm", "start" ]