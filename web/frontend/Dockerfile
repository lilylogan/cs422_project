# Frontend Dockerfile
FROM node:16

WORKDIR /app

# caching current dependencies
COPY ./package*.json ./

# install dependencies
RUN npm install

# Copy everything
COPY . .

# Build the app
RUN npm run build

# Expose the React port
EXPOSE 3000

# Start React
CMD ["npm", "run", "start"]



