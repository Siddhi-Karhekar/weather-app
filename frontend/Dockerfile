# ---- Stage 1: Build Vite app ----
FROM node:18 AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build the app (output will go to /app/build)
RUN npm run build

# ---- Stage 2: Serve via Nginx ----
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy from /app/build (not /app/dist!)
COPY --from=build /app/build .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
