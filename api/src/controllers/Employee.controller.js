import Employee from "../models/Employee.js";
import { deleteFile } from "../middlewares/upload.js";

export const EmployeeController = {
  createEmployee: async (req, res) => {
    const {
      name,
      email,
      password,
      selectrole,
      location,
      selectshop,
      mobilenumber,
      city,
      address,
      accountnumber,
      aadharupload,
      anyproof,
      ifsc,
    } = req.body;
  
    try {
      // Check if the employee already exists based on the name
      let existing = await Employee.findOne({ name });
  
      if (existing) {
        deleteFile(aadharupload);
        return res.status(409).json({ message: "Employee already exists" });
      }
  
      // Create a new employee using the updated model
      const newEmployee = await Employee.create({
        name,
        email,
        location,
        selectshop,
        mobilenumber,
        city,
        address,
        password,
        selectrole,
        bankdetailsandkyc: { accountnumber, aadharupload,anyproof,ifsc }, 
      });
  
      return res.status(201).json({
        message: "Employee created successfully",
        ok: true,
        data: {
          name: newEmployee.name,
          email: newEmployee.email,
          location: newEmployee.location,
          selectshop: newEmployee.selectshop,
          mobilenumber: newEmployee.mobilenumber,
          city: newEmployee.city,
          address: newEmployee.address,
          password: newEmployee.password,
          selectrole: newEmployee.selectrole,
          accountnumber: newEmployee.bankdetailsandkyc.accountnumber,
          aadharupload: newEmployee.bankdetailsandkyc.aadharupload,
          anyproof: newEmployee.bankdetailsandkyc.anyproof,
          ifsc: newEmployee.bankdetailsandkyc.ifsc,
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getEmployees: async (req, res) => {
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

      const employees = await Employee.find(query)
      .skip((page - 1) * limit)
        .limit(limit)
        .populate("products")
        .sort({ createdAt: -1 })
        .exec();

        const count = await Employee.countDocuments(query);

      return res.status(200).json({ data: employees, ok: true,message: "Employees fetched successfully",count });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getEmployee: async (req, res) => {
    try {
      const { id } = req.query;

      const employee = await Employee.findById(id);

      return res.status(200).json({ data: employee, ok: true,message: "Employee fetched successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.query;

      const employee = await Employee.findByIdAndDelete(id);

      return res.status(200).json({ data: employee, ok: true,message: "Employee deleted successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  updateEmployee: async (req, res) => {
    try {
      const { id } = req.query;
      const { name,email,selectrole, anyproof,
        ifsc,accountnumber,aadharupload, location,password, selectshop, mobilenumber, city, address } =
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
          aadharupload,
          anyproof,
          ifsc
        },
        { new: true }
      );

      return res.status(200).json({ data: employee, ok: true,message: "Employee updated successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
