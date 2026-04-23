import express from "express";
import axios from "axios";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// ------------------ ENDPOINT LOCAL ------------------
    
app.get("/api/products", async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

// ------------------ ENDPOINT QUE LLAMA OTRO MS ------------------

app.get("/api/all-data", async (req, res) => {
    try {
        const users = await axios.get(`${USER_SERVICE_URL}/api/users`);
        const products = await prisma.product.findMany();

        res.json({
            users: users.data,
            products
        });
    } catch (error) {
        res.status(500).json({ error: "Error comunicando microservicios" });
    }
});
// Crear producto
app.post("/api/products", async (req, res) => {
    try {
        const { name, price } = req.body;

        const newProduct = await prisma.product.create({
            data: { name, price }
        });

        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Error creando producto" });
    }
});
app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
});