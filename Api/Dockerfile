FROM node:16
 
WORKDIR /app  
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
ARG PORT
ARG DATABASE
ARG JWT_SECRET
ARG JWT_EXPIRES_IN
 
RUN echo "PORT=${PORT}" > config.env && \
    echo "DATABASE=${DATABASE}" >> config.env && \
    echo "JWT_SECRET=${JWT_SECRET}" >> config.env && \
    echo "JWT_EXPIRES_IN=${JWT_EXPIRES_IN}" >> config.env
 
EXPOSE ${PORT}
CMD ["npm", "start"]