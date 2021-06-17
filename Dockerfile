FROM node:14-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . ./ 
RUN npm run build

FROM nginx:1.21-alpine
COPY --from=build ./app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf   
EXPOSE 3000
ENTRYPOINT ["nginx","-g","daemon off;"]


