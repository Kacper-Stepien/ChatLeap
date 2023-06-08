FROM nginx
 
WORKDIR /usr/share/react
 
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
 
RUN npm install -g npm@9.6.7
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
ARG REACT_APP_SERVER
RUN echo "REACT_APP_SERVER=${REACT_APP_SERVER}}" > .env
 
 
RUN npm run build
 
RUN rm -r /usr/share/nginx/html/*
 
RUN cp -a build/. /usr/share/nginx/html