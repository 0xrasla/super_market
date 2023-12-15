import Warehouse from "../models/Warehouse.js";
import Products from "../models/Products.js";

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

      const createdProducts = await Products.insertMany(warehouseProducts);
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
    try {
      const warehouses = await Warehouse.find({});

      return res.status(200).json({ data: warehouses, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getWarehouse: async (req, res) => {
    try {
      const { id } = req.query;

      const warehouse = await Warehouse.findById(id);

      return res.status(200).json({ data: warehouse, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteWarehouse: async (req, res) => {
    try {
      const { id } = req.query;

      const warehouse = await Warehouse.findByIdAndDelete(id);

      return res.status(200).json({ data: warehouse, ok: true });
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

      return res.status(200).json({ data: warehouse, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
