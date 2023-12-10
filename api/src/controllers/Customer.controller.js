import Customer from "../models/Customer.js";

export const CustomerController = {
  createCustomer: async (req, res) => {
    const { customername, customertype,email, mobilenumber, city, address } =
      req.body;

    try {
      const newCustomer = {
        customername,
        customertype,
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
            customertype: customer.customertype,
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
    try {
      const customers = await Customer.find();

      return res.status(200).json({ data: customers, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getCustomer: async (req, res) => {
    try {
      const { id } = req.query;

      const customer = await Customer.findById(id);

      return res.status(200).json({ data: customer, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const { id } = req.query;

      const customer = await Customer.findByIdAndDelete(id);

      return res.status(200).json({ data: customer, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const { id } = req.query;
      const { customername, customertype,email, mobilenumber, city, address } =
        req.body;

      const customer = await Customer.findByIdAndUpdate(
        id,
        {
            customername,
            customertype,
          mobilenumber,
          city,
          email,
          address,
        },
        { new: true }
      );

      return res.status(200).json({ data: customer, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
