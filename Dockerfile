FROM node:14-alpine as build
WORKDIR /app
COPY package*.json patches/ ./
RUN npm install --unsafe-perm
COPY . ./ 
RUN npm run build 

FROM nginx:1.21-alpine
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build ./app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
ENTRYPOINT ["nginx","-g","daemon off;"]


