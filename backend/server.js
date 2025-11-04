require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const MenuItem = require("./models/MenuItem");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
console.log("Connecting to MongoDB...");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err.message));

// API Routes
app.get("/", (req, res) => {
  res.send("☕ Coffee Shop API Running!");
});

// Get all menu items
app.get("/menu", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching menu" });
  }
});

// Get one random item
app.get("/menu/random", async (req, res) => {
  try {
    const items = await MenuItem.find();
    if (items.length === 0) return res.json({ message: "No items in menu" });
    const randomItem = items[Math.floor(Math.random() * items.length)];
    res.json(randomItem);
  } catch (err) {
    res.status(500).json({ message: "Error fetching random item" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
