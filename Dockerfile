# FROM node:16

# WORKDIR /app

# COPY package*.json ./

# RUN npm install


# # Install TypeScript compiler globally
# RUN npm install -g typescript

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD ["node", "dist/main.js"]


# Stage 1: Build
FROM node:18 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g nodemon

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY --from=builder /usr/src/app/package*.json ./

# Copy the build output from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Install only production dependencies
RUN npm install --production

# Command to run the application
CMD ["npm", "run", "start:dev"]
