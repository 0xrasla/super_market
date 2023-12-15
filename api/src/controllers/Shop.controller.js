import Shop from "../models/Shop.js";

export const ShopController = {
  createShop: async (req, res) => {
    const { name, location,email, ownername, mobilenumber, city, address } =
      req.body;

    try {
      const newShop = {
        name,
        email,
        location,
        ownername,
        mobilenumber,
        city,
        address,
      };

      let existing = await Shop.findOne({ name });

      if (existing) {
        return res.status(409).json({ message: "Shop already exists" });
      }

      const shop = await Shop.create(newShop);

      return res.status(201).json({
        message: "Shop created successfully",
        ok: true,
        data: {
          name: shop.name,
          email:shop.email,
          location: shop.location,
          ownername: shop.ownername,
          mobilenumber: shop.mobilenumber,
          city: shop.city,
          address: shop.address,
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getShopes: async (req, res) => {
    try {
      const shopes = await Shop.find();

      return res.status(200).json({ data: shopes, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getShop: async (req, res) => {
    try {
      const { id } = req.query;

      const shop = await Shop.findById(id);

      return res.status(200).json({ data: shop, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteShop: async (req, res) => {
    try {
      const { id } = req.query;

      const shop = await Shop.findByIdAndDelete(id);

      return res.status(200).json({ data: shop, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  updateShop: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, location,email, ownername, mobilenumber, city, address } =
        req.body;

      const shop = await Shop.findByIdAndUpdate(
        id,
        {
          name,
          email,
          location,
          ownername,
          mobilenumber,
          city,
          address,
        },
        { new: true }
      );

      return res.status(200).json({ data: shop, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
