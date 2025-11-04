const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: { type: Boolean, default: true }
});

const MenuItem = mongoose.model("menuitems", menuItemSchema); // 👈 make sure name is 'menuitems'

module.exports = MenuItem;
