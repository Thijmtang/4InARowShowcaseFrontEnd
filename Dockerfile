FROM node:18-alpine

WORKDIR /app

# Copy only package.json and package-lock.json (if you have it)
COPY package.json package-lock.json ./

# Install app dependencies (this will be cached unless package.json/package-lock.json changes)
RUN npm install

# Install serve globally
RUN npm i -g serve

# Copy the rest of your application files
COPY . .

# Build your app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set the default command to run when the container starts
CMD [ "serve", "-s", "dist" ]