# Pull official base image
FROM ubuntu:20.04

# Copy react folder to container
COPY . .

# Misc packages for debugging
RUN apt-get -y update &&\
    apt-get install -y bash &&\
    apt-get -y install curl &&\
    apt-get -y install tmux &&\
    apt-get install -y nano

# React Installation
RUN curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh &&\
    bash nodesource_setup.sh

# Node Installation
RUN apt-get install -y nodejs

# Nohup pre-requisites Installation
RUN npm install -y --global yarn &&\
    npm install -y --global nodemon &&\
    npm install -y --global fs &&\
    npm install -y --global forever

# Installing Marqeta API App Packages
RUN cd marqeta-api-app/frontend-app && npm install && cd ../backend-server && npm install