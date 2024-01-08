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
    let { page, limit, search, startdate, enddate } = req.query;

    try {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      const query = {};

      if (search) {
        query.name = {
          $regex: search,
          $options: "i",
        };
      }
      if (startdate) {
        query.createdAt = {
          $gte: startdate,
        };
      }
      if (enddate) {
        query.createdAt = {
          $lte: enddate,
        };
      }

      const categories = await Category.find(query)
      .skip((page - 1) * limit)
        .limit(limit)
        .populate("products")
        .sort({ createdAt: -1 })
        .exec();

        const count = await Category.countDocuments(query);

      return res.status(200).json({ data: categories, ok: true ,message: "Categories fetched successfully",count});
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getCategory: async (req, res) => {
    try {
      const { id } = req.query;

      const category = await Category.findById(id);

      return res.status(200).json({ data: category, ok: true, message: "Category fetched successfully" });
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

      return res.status(200).json({ data: category, ok: true,message: "Category updated successfully"});
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

      return res.status(200).json({ data: category, ok: true ,message: "Category deleted successfully"});
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
