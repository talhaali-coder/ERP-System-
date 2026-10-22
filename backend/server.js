
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Meezan ERP Backend is running",
    status: "success"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    system: "Meezan ERP"
  });
});

app.listen(PORT, () => {
  console.log(`Meezan ERP server running on http://localhost:${PORT}`);
});
