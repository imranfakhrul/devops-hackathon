# Use the official Node.js 20 alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 4000 (or whichever port your Express.js app listens on)
EXPOSE 8080

# Command to run the application
CMD ["node", "app.js"]
