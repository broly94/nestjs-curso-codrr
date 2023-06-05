# Utiliza una imagen base de Node.js 16
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y pnpm-lock.json a /app
COPY package*.json pnpm-lock.json ./

# Instala las dependencias
RUN npm install -g pnpm
RUN pnpm install

# Copia el resto de los archivos de la aplicación a /app
COPY . .

# Compila la aplicación TypeScript
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "run", "start:prod"]
