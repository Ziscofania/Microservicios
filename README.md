# Microservicios con Node.js + Prisma + PostgreSQL

Proyecto basado en arquitectura de microservicios utilizando:

- Node.js + Express
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose

---

## Arquitectura

- **user-service** → Manejo de usuarios (mock)
- **gateway-service** → API principal + conexión a base de datos
- **db** → PostgreSQL

---

## Requisitos

Antes de ejecutar el proyecto, debes tener instalado:

- Docker
- Docker Compose
- Node.js (v18 o superior)
- npm o yarn

---

## Instalación

```bash
git clone <URL_DEL_REPO>
cd microservicios
```
Ejecutar con Docker
```bash
docker compose up --build
```
Prisma (Base de datos)
Si necesitas trabajar Prisma manualmente:

# Generar cliente
```bash
npx prisma generate
```
# Crear tablas en la DB
```bash
npx prisma migrate dev --name init
```
# Interfaz visual
```bash
npx prisma studio
```
# Endpoints
- User Service
```bash
GET http://localhost:4000/api/users
```
- Gateway Service
Obtener productos
```bash
GET http://localhost:3000/api/products
```
Crear producto
```bash
POST http://localhost:3000/api/products
```

Content-Type: application/json
```code
{
  "name": "Pizza",
  "price": 25000
}
```
Obtener datos combinados
```bash
GET http://localhost:3000/api/all-data
```
## Pruebas con cURL
```bash
curl http://localhost:4000/api/users
```
```bash
curl http://localhost:3000/api/products
```
```bash
curl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-d '{"name":"Pizza","price":25000}'
```
```bash
curl http://localhost:3000/api/all-data
```
## Detener servicios
```bash
docker compose down
```
Reiniciar contenedores
```bash
docker compose down -v
docker compose up --build
```
