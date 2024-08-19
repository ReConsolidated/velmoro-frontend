# Etap budowania aplikacji
FROM node:18-alpine as build

# Ustawienie katalogu roboczego
WORKDIR /app

# Skopiowanie plików package.json i package-lock.json
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Skopiowanie reszty plików projektu
COPY . .

# Budowanie aplikacji
RUN npm run build

# Etap serwowania aplikacji
FROM nginx:1.21-alpine

# Usunięcie domyślnej konfiguracji NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Skopiowanie własnej konfiguracji NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Skopiowanie zbudowanej aplikacji do katalogu, z którego NGINX będzie serwował pliki
COPY --from=build /app/dist /usr/share/nginx/html

# Otworzenie portu 80
EXPOSE 80

# Uruchomienie NGINX
CMD ["nginx", "-g", "daemon off;"]
