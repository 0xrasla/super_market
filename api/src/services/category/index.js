import CategoryModel from "../../models/Category.model.js";

export const CategoryService = {
  addCategory: async function ({ name }) {
    try {
      const existing = await CategoryModel.findOne({ name });
      if (existing) {
        return {
          ok: false,
          data: null,
          message: "Category already exists",
        };
      }

      const newCategory = new CategoryModel({
        name,
      });
      await newCategory.save();

      return {
        ok: true,
        data: {
          name: newCategory.name,
        },
        message: "Category added successfully",
      };
    } catch (error) {
      return {
        ok: false,
        data: null,
        message: error.message,
      };
    }
  },

  getCategories: async function ({ page, limit }) {
    try {
      const categories = await CategoryModel.find({}, { name: 1 })
        .sort({ name: 1 })
        .skip((page - 1) * limit)
        .limit(limit);

      return {
        ok: true,
        data: categories,
        message: "Categories fetched successfully",
      };
    } catch (e) {
      return {
        ok: false,
        data: null,
        message: e.message,
      };
    }
  },

  getCategory: async function ({ id }) {
    try {
      const category = await CategoryModel.findById(id, { name: 1 });

      if (!category) {
        return {
          ok: false,
          data: null,
          message: "Category not found",
        };
      }

      return {
        ok: true,
        data: category,
        message: "Category fetched successfully",
      };
    } catch (e) {
      return {
        ok: false,
        data: null,
        message: e.message,
      };
    }
  },

  deleteCategory: async function ({ id }) {
    try {
      const deleted = await CategoryModel.findByIdAndDelete(id);

      if (!deleted) {
        return {
          ok: false,
          data: null,
          message: "Category not found",
        };
      }

      return {
        ok: true,
        data: null,
        message: "Category deleted successfully",
      };
    } catch (e) {
      return {
        ok: false,
        data: null,
        message: e.message,
      };
    }
  },

  updateCategory: async function ({ id, name }) {
    try {
      const existing = await CategoryModel.findById(id);
      if (!existing) {
        return {
          ok: false,
          data: null,
          message: "Category not found",
        };
      }

      const updated = await CategoryModel.findByIdAndUpdate(id, { name });
      if (!updated) {
        return {
          ok: false,
          data: null,
          message: "Category not found",
        };
      }

      return {
        ok: true,
        data: updated,
        message: "Category updated successfully",
      };
    } catch (e) {
      return {
        ok: false,
        data: null,
        message: e.message,
      };
    }
  },
};
