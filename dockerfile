# First stage: build
FROM node:20-alpine AS builder

# Install build tools
RUN apk add --no-cache make g++ python3

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies in the build stage
RUN npm install

# Copy the rest of the application code and build it
COPY . .
RUN npm run build

# Second stage: production
FROM node:20-alpine

WORKDIR /app

# Copy only the built application from the build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
