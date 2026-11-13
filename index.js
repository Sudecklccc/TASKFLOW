
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use("/api/tasks", taskRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("TASKFLOW sunucusu çalışıyor!");
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
