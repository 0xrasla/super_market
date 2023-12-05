import { deleteFile } from "../middlewares/upload.js";
import Category from "../models/Category.js";

export const CategoryController = {
  createCategory: async (req, res) => {
    try {
      const { name, image } = req.body;

      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        deleteFile(image);
        return res.status(409).json({ message: "Category already exists" });
      }

      const category = await Category.create({
        name: name,
        image: image,
      });

      return res.status(201).json({
        message: "Category created successfully",
        ok: true,
        data: {
          name: category.name,
          image: category.image,
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();

      return res.status(200).json({ data: categories, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getCategory: async (req, res) => {
    try {
      const { id } = req.query;

      const category = await Category.findById(id);

      return res.status(200).json({ data: category, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, image } = req.body;

      const category = await Category.findByIdAndUpdate(
        id,
        { name, image },
        { new: true }
      );

      return res.status(200).json({ data: category, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.query;

      const category = await Category.findByIdAndDelete(id);

      if (category) {
        deleteFile(category.image);
      }

      return res.status(200).json({ data: category, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
