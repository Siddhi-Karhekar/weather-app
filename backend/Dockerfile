# ---- Stage 1: Base Node environment ----
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./

# Install dependencies (including dev if needed for build)
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose backend port
EXPOSE 5000

# Set environment variables (optional defaults)
ENV NODE_ENV=production

# Start the server
CMD ["npm", "start"]
