import Employee from "../models/Employee.js";

export const EmployeeController = {
  createEmployee: async (req, res) => {
    const { name,email,password,selectrole,accountnumber,aadharupload, location, selectshop, mobilenumber, city, address } =
      req.body;

    try {
      const newEmployee = {
        name,
        email,
        location,
        selectshop,
        mobilenumber,
        city,
        address,
        password,
        selectrole,
        accountnumber,
        aadharupload
      };

      let existing = await Employee.findOne({ name });

      if (existing) {
        return res.status(409).json({ message: "Employee already exists" });
      }

      const employee = await Employee.create(newEmployee);

      return res.status(201).json({
        message: "Employee created successfully",
        ok: true,
        data: {
          name: employee.name,
          email: employee.email,
          location: employee.location,
          selectshop: employee.selectshop,
          mobilenumber: employee.mobilenumber,
          city: employee.city,
          address: employee.address,
          password: employee.password,
          selectrole: employee.selectrole,
          accountnumber: employee.accountnumber,
          aadharupload: employee.aadharupload,
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getEmployees: async (req, res) => {
    try {
      const employees = await Employee.find();

      return res.status(200).json({ data: employees, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getEmployee: async (req, res) => {
    try {
      const { id } = req.query;

      const employee = await Employee.findById(id);

      return res.status(200).json({ data: employee, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.query;

      const employee = await Employee.findByIdAndDelete(id);

      return res.status(200).json({ data: employee, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  updateEmployee: async (req, res) => {
    try {
      const { id } = req.query;
      const { name,email,selectrole,accountnumber,aadharupload, location,password, selectshop, mobilenumber, city, address } =
        req.body;

      const employee = await Employee.findByIdAndUpdate(
        id,
        {
          name,
          email,
          location,
          selectshop,
          mobilenumber,
          password,
          city,
          address,
          selectrole,
          accountnumber,
          aadharupload
        },
        { new: true }
      );

      return res.status(200).json({ data: employee, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
