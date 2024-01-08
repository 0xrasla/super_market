import Shop from "../models/Shop.js";
import Product from "../models/Products.js";

export const ShopController = {
  createShop: async (req, res) => {
    const {
      shopname,
      location,
      shopownername,
      mobilenumber,
      city,
      address,
      products,
      email,
    } = req.body;

    try {
      const newShop = {
        shopname,
        location,
        shopownername,
        mobilenumber,
        city,
        address,
        email
      };

      const existing = await Shop.findOneAndUpdate(
        { shopname },
        { $setOnInsert: newShop },
        { upsert: true, new: true }
      );

      const shop = existing;
      const shopProducts = products.map((product) => ({
        ...product,
        shop: shop._id,
      }));

      const createdProducts = await Product.insertMany(shopProducts);
      const productIds = createdProducts.map((product) => product._id);

      shop.products = productIds;
      await shop.save();

      return res.status(201).json({
        message: "Shop created successfully",
        ok: true,
        data: {
          shopname: shop.shopname,
          location: shop.location,
          shopownername: shop.shopownername,
          mobilenumber: shop.mobilenumber,
          city: shop.city,
          email: shop.email,
          address: shop.address,
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getShops: async (req, res) => {
    let { page, limit, search, startdate, enddate } = req.query;

    try {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      const query = {};

      if (search) {
        query.shopname = {
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

      const shops = await Shop.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("products")
        .sort({ createdAt: -1 })
        .exec();

        const count = await Shop.countDocuments(query);

      return res.status(200).json({ data: shops, ok: true, message: "Shops fetched successfully",count });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getShop: async (req, res) => {
    try {
      const { id } = req.query;

      const shop = await Shop.findById(id);

      return res.status(200).json({ data: shop, ok: true, message: "Shop fetched successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteShop: async (req, res) => {
    try {
      const { id } = req.query;

      const shop = await Shop.findByIdAndDelete(id);

      return res.status(200).json({ data: shop, ok: true, message: "Shop deleted successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  updateShop: async (req, res) => {
    try {
      const { id } = req.query;
      const {
        shopname,
        location,
        shopownername,
        mobilenumber,
        city,
        address,
      } = req.body;

      const shop = await Shop.findByIdAndUpdate(
        id,
        {
          shopname,
          location,
          shopownername,
          mobilenumber,
          city,
          address,
        },
        { new: true }
      );

      return res.status(200).json({ data: shop, ok: true, message: "Shop updated successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  generatePdf: async (req, res) => {
    // Your PDF generation logic goes here
  },
};
