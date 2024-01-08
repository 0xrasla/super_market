import Customer from "../models/Customer.js";

export const CustomerController = {
  createCustomer: async (req, res) => {
    const { customername, type, email, mobilenumber, city, address } =
      req.body;

    try {
      const newCustomer = {
        customername,
        type,
        email,
        mobilenumber,
        city,
        address,
      };

      let existing = await Customer.findOne({ mobilenumber });

      if (existing) {
        return res.status(409).json({ message: "Customer already exists" });
      }

      const customer = await Customer.create(newCustomer);

      return res.status(201).json({
        message: "Customer created successfully",
        ok: true,
        data: {
          type: customer.type,
          customername: customer.customername,
          email: customer.email,
          mobilenumber: customer.mobilenumber,
          city: customer.city,
          address: customer.address,
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getCustomers: async (req, res) => {
    let { page, limit, search, startdate, enddate } = req.query;

    try {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      const query = {};

      if (search) {
        query.customername = {
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

      const customers = await Customer.find(query)
      .skip((page - 1) * limit)
        .limit(limit)
        .populate("products")
        .sort({ createdAt: -1 })
        .exec();

        const count = await Customer.countDocuments(query);


      return res.status(200).json({ data: customers, ok: true,message: "Customers fetched successfully",count });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getCustomer: async (req, res) => {
    try {
      const { id } = req.query;

      const customer = await Customer.findById(id);

      return res.status(200).json({ data: customer, ok: true ,message: "Customer fetched successfully"});
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const { id } = req.query;

      const customer = await Customer.findByIdAndDelete(id);

      return res.status(200).json({ data: customer, ok: true,message: "Customer deleted successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const { id } = req.query;
      const { customername, type,email, mobilenumber, city, address } =
        req.body;

      const customer = await Customer.findByIdAndUpdate(
        id,
        {
          customername,
            type,
          mobilenumber,
          city,
          email,
          address,
        },
        { new: true }
      );
      if (!customer) {
        return res.status(404).json({ message: "Customer not found", ok: false });
      }

      return res.status(200).json({ data: customer, ok: true ,message: "Customer updated successfully"});
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
