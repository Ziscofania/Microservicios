import express from "express";
import axios from "axios";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// Endpoint opcional para comprobar que el gateway está vivo
app.get("/", (req, res) => {
  res.send("Gateway funcionando");
});

// Obtener productos
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("products error message:", error.message);
    console.error("products error code:", error.code);
    console.error("products error meta:", error.meta);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
});

// Obtener datos combinados
app.get("/api/all-data", async (req, res) => {
  try {
    const users = await axios.get(`${USER_SERVICE_URL}/api/users`);
    const products = await prisma.product.findMany();

    res.json({
      users: users.data,
      products,
    });
  } catch (error) {
    console.error("all-data error message:", error.message);
    console.error("all-data error status:", error.response?.status);
    console.error("all-data error data:", error.response?.data);
    console.error("all-data error code:", error.code);
    res.status(500).json({ error: "Error comunicando microservicios" });
  }
});

// Crear producto
app.post("/api/products", async (req, res) => {
  try {
    const { name, price } = req.body;

    const newProduct = await prisma.product.create({
      data: { name, price },
    });

    res.json(newProduct);
  } catch (error) {
    console.error("create product error message:", error.message);
    console.error("create product error code:", error.code);
    console.error("create product error meta:", error.meta);
    res.status(500).json({ error: "Error creando producto" });
  }
});

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});