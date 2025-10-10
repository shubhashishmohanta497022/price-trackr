# Stage 1: Build the React app
FROM node:22.4.0-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Pass build-time variables for API URLs
ARG VITE_API_BASE_URL
ARG VITE_WS_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_WS_URL=${VITE_WS_URL}
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.25-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
# If you have a custom nginx config for the frontend, copy it here
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

