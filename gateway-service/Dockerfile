FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# 👇 CLAVE: generar Prisma antes de arrancar
CMD ["sh", "-c", "npx prisma generate && npm start"]