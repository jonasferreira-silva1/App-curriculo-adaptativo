# Stage 1: Build da aplicação React + Vite
FROM node:22-alpine AS builder

WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

# Instala as dependências do projeto
RUN npm ci

# Copia todo o código-fonte
COPY . .

# Executa o build de produção (TypeScript + Vite)
RUN npm run build

# Stage 2: Servidor Nginx leve para servir os arquivos estáticos
FROM nginx:alpine AS runner

# Copia a configuração personalizada do Nginx para suporte a SPA (Single Page Application)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados no build para a pasta do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
