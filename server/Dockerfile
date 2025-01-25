# Select a lightweight base image
FROM node:22-alpine3.20

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN apk add --no-cache python3 make g++ gcc && npm install

# Copy application source code
COPY . .

# Expose the application port
EXPOSE 5000

# Run the application
CMD ["npm", "start"]
