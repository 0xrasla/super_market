import Warehouse from "../models/Warehouse.js";

export const WarehouseController = {
  createWarehouse: async (req, res) => {
    const { name, location, managername, mobilenumber, city, address } =
      req.body;

    try {
      const newWarehouse = {
        name,
        location,
        managername,
        mobilenumber,
        city,
        address,
      };

      let existing = await Warehouse.findOne({ name });

      if (existing) {
        return res.status(409).json({ message: "Warehouse already exists" });
      }

      const warehouse = await Warehouse.create(newWarehouse);

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
      const warehouses = await Warehouse.find();

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
