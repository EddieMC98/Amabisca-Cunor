#FROM node:alpine AS builder
#COPY . ./frontend
#WORKDIR /frontend
#RUN npm i
#RUN $(npm bin)/ng build --prod --build-optimizer=false --aot=false

#FROM nginx:alpine
#COPY --from=builder /frontend/dist/frontend/ /usr/share/nginx/html/

FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
