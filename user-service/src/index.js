import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Endpoint de prueba
app.get("/api/users", (req, res) => {
    res.json([
        { id: 1, name: "Cesar" },
        { id: 2, name: "Camilo" }
    ]);
});

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});