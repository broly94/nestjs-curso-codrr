# Utiliza una imagen base de Node.js 18.14.2
FROM node:18.14.2

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json a /app
COPY package*.json ./

# Instala las dependencias
RUN pnpm install

# Copia el resto de los archivos de la aplicación a /app
COPY . .

# Compila la aplicación TypeScript
RUN pnpm run build

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Inicia la aplicación
CMD ["pnpm", "run", "start:prod"]