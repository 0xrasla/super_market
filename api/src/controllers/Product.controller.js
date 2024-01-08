import Product from "../models/Product.js";
import Warehouse from "../models/Warehouse.js";

export const ProductController = {
  createProduct: async (req, res) => {
    const {
      lotNumber,
      rackNumber,
      productName,
      category,
      vendor,
      gst,
      price,
      discount,
      expirydate,
      quantity,
      addedwarehouses,
    } = req.body;

    try {
      const newProduct = {
        lotNumber,
        rackNumber,
        productName,
        category,
        vendor,
        gst,
        price,
        discount,
        expirydate,
        quantity,
        addedwarehouses,
      };

      const existing = await Product.findOneAndUpdate(
        { productName },
        { $setOnInsert: newProduct },
        { upsert: true, new: true }
      );

      const product = existing;

      const productWarehouses = addedwarehouses.map((warehouse) => ({
        ...warehouse,
        product: product._id,
      }));

      const createdWarehouses = await Warehouse.insertMany(productWarehouses);
      const warehouseIds = createdWarehouses.map((warehouse) => warehouse._id);

      product.warehouses = warehouseIds;
      await product.save();

      return res.status(201).json({
        message: "Product created successfully",
        ok: true,
        data: {
          gst: product.gst,
          lotNumber: product.lotNumber,
          productName: product.productName,
          category: product.category,
          vendor: product.vendor,
          rackNumber: product.rackNumber,
          name: product.name,
          price: product.price,
          discount: product.discount,
          expirydate: product.expirydate,
          quantity: product.quantity,
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getProducts: async (req, res) => {
    let { page, limit, search, startdate, enddate } = req.query;
    try {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      const query = {};

      if (search) {
        query.productName = {
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

      const products = await Product.find(query)
      .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec()
      .populate("category vendor");

      const count = await Product.countDocuments(query);

      return res.status(200).json({ data: products, ok: true,message: "Products fetched successfully",count });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getProduct: async (req, res) => {
    try {
      const { id } = req.query;

      const product = await Product.findById(id);

      return res.status(200).json({ data: product, ok: true,message: "Product fetched successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.query;

      const product = await Product.findByIdAndDelete(id);

      return res.status(200).json({ data: product, ok: true,message: "Product deleted successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.query;
      const {  lotNumber, rackNumber,productName,category,vendor,name, price, discount, expirydate,quantity } =
        req.body;

      const product = await Product.findByIdAndUpdate(
        id,
        {
          lotNumber,
          rackNumber,
          productName,
          category,
          vendor,
          name,
          price,
          discount,
          expirydate,
          quantity,
        },
        { new: true }
      );

      return res.status(200).json({ data: product, ok: true ,message: "Product updated successfully"});
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
