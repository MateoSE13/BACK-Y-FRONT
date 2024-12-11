FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el contenido del proyecto
COPY . .

# Exponer el puerto
EXPOSE 8080

# Comando por defecto para iniciar el servidor
CMD ["node", "index.js"]
