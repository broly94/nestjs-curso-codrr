# Utiliza una imagen base de Node.js 16
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y pnpm-lock.json a /app
COPY package*.json pnpm-lock.yaml ./

# Instala las dependencias
RUN npm install -g pnpm
RUN pnpm install

# Configura el directorio global de binarios de pnpm
RUN pnpm config set global-bin-dir /usr/local/bin

# Instala globalmente @nestjs/cli
RUN pnpm add -g @nestjs/cli

# Copia el resto de los archivos de la aplicación a /app
COPY . .

# Compila la aplicación TypeScript
RUN pnpm run build

# Después de la línea "RUN pnpm run build"
RUN ls -l

# Ejecuta las migraciones
# RUN pnpm run m:run:prod

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Inicia la aplicación
CMD ["pnpm", "run", "start:prod"]

