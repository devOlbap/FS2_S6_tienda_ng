# FROM node:20.14.0 AS build

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx:alpine

# COPY --from=build /app/dist/tienda_front/browser /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx","-g", "daemon off;"]


# Usar una imagen base de Node.js para construir la aplicación
FROM node:20.14 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código del proyecto al contenedor
COPY . .

# Construir la aplicación Angular
RUN npm run build 

# Usar una imagen base de nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos estáticos construidos desde el contenedor de construcción anterior
COPY --from=build /app/dist/tienda_front/browser /usr/share/nginx/html

# Copiar archivo de configuración de Nginx
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para el servidor
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]