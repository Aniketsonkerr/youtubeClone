# ===== Development Image =====
FROM node:22.18.0-alpine

# Set working dir inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally for dev hot reload
RUN npm install -g nodemon

# Copy the rest of your backend code
COPY . .

# Expose backend API port
EXPOSE 3000

# Default command for development
CMD ["npm", "run", "dev"]
