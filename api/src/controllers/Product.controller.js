import Product from "../models/Product.js";

export const ProductController = {
  createProduct: async (req, res) => {
    const { lotNumber, rackNumber,productName,category,vendor,name, price, discount, expirydate,quantity } =
      req.body;

    try {
      const newProduct = {
        lotNumber,
        rackNumber,
        productName,
        category,
        vendor,
        name,
        price,
        discount,
        expirydate,
        quantity
      };

      let existing = await Product.findOne({ gstnumber });

      if (existing) {
        return res.status(409).json({ message: "Product already exists" });
      }

      const product = await Product.create(newProduct);

      return res.status(201).json({
        message: "Product created successfully",
        ok: true,
        data: {
            gstnumber: product.gstnumber,
            businessname: product.businessname,
            vendorname: product.vendorname,
          mobilenumber: product.mobilenumber,
          city: product.city,
          address: product.address,
          email: product.email,
          location: product.location,
          accountnumber: product.accountnumber,
          ifsc: product.ifsc,
          aadharupload: product.aadharupload
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getProducts: async (req, res) => {
    try {
      const products = await Vendor.find();

      return res.status(200).json({ data: products, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getProduct: async (req, res) => {
    try {
      const { id } = req.query;

      const product = await Product.findById(id);

      return res.status(200).json({ data: product, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.query;

      const product = await Product.findByIdAndDelete(id);

      return res.status(200).json({ data: product, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.query;
      const {  lotNumber, rackNumber,productName,category,vendor,name, price, discount, expirydate,quantitys } =
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
          quantity
        },
        { new: true }
      );

      return res.status(200).json({ data: product, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
