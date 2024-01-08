import Warehouse from "../models/Warehouse.js";
import Product from "../models/Products.js";
import { generatePdf } from "../middlewares/pdfGenerator.js";

export const WarehouseController = {
  createWarehouse: async (req, res) => {
    const {
      name,
      location,
      managername,
      mobilenumber,
      city,
      address,
      products,
    } = req.body;

    try {
      const newWarehouse = {
        name,
        location,
        managername,
        mobilenumber,
        city,
        address,
      };

      const existing = await Warehouse.findOneAndUpdate(
        { name },
        { $setOnInsert: newWarehouse },
        { upsert: true, new: true }
      );

      const warehouse = existing;
      const warehouseProducts = products.map((product) => ({
        ...product,
        warehouse: warehouse._id,
      }));

      const createdProducts = await Product.insertMany(warehouseProducts);
      const productIds = createdProducts.map((product) => product._id);

      warehouse.products = productIds;
      await warehouse.save();

      return res.status(201).json({
        message: "Warehouse created successfully",
        ok: true,
        data: {
          name: warehouse.name,
          location: warehouse.location,
          managername: warehouse.managername,
          mobilenumber: warehouse.mobilenumber,
          city: warehouse.city,
          address: warehouse.address,
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getWarehouses: async (req, res) => {
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

      const warehouses = await Warehouse.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("products")
        .sort({ createdAt: -1 })
        .exec();

        const count = await Warehouse.countDocuments(query);

      return res.status(200).json({ data: warehouses, ok: true, message: "Warehouses fetched successfully",count });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getWarehouse: async (req, res) => {
    try {
      const { id } = req.query;

      const warehouse = await Warehouse.findById(id);

      return res.status(200).json({ data: warehouse, ok: true, message: "Warehouse fetched successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteWarehouse: async (req, res) => {
    try {
      const { id } = req.query;

      const warehouse = await Warehouse.findByIdAndDelete(id);

      return res.status(200).json({ data: warehouse, ok: true, message: "Warehouse deleted successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  updateWarehouse: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, location, managername, mobilenumber, city, address } =
        req.body;

      const warehouse = await Warehouse.findByIdAndUpdate(
        id,
        {
          name,
          location,
          managername,
          mobilenumber,
          city,
          address,
        },
        { new: true }
      );

      return res.status(200).json({ data: warehouse, ok: true , message: "Warehouse updated successfully"});
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  generatePdf: async (req, res) => {
    try {
      await generatePdf();
      res.status(200).send('PDF Generated successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
};