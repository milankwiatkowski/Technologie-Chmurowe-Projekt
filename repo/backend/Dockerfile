FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
ENV DB_HOST=db
ENV DB_NAME=postsdb
ENV DB_USER=user
ENV DB_PASSWORD=password
