const express = require("express");
const router = express.Router();
const Menu = require("../models/menuSchema"); // Import the Mongoose model

// CREATE: Add a new menu or menu item
router.post("/", async (req, res) => {
  try {
    const menuData = req.body;
    const menu = new Menu(menuData);
    await menu.save();
    res.status(201).json({ message: "Menu created successfully", menu });
  } catch (error) {
    res.status(500).json({ message: "Error creating menu", error: error.message });
  }
});

// READ: Get all menu items
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menus", error: error.message });
  }
});

// READ: Get a specific menu by ID
router.get("/:id", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu", error: error.message });
  }
});

// UPDATE: Update a menu or menu item
router.put("/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const menu = await Menu.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json({ message: "Menu updated successfully", menu });
  } catch (error) {
    res.status(500).json({ message: "Error updating menu", error: error.message });
  }
});

// DELETE: Delete a menu or menu item
router.delete("/:id", async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu", error: error.message });
  }
});

module.exports = router;
