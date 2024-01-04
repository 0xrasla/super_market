import Vendor from "../models/Vendor.js";

export const VendorController = {
  createVendor: async (req, res) => {
    const {   lotNumber,
        rackNumber,
        productName,
        category,
        vendor,
        name,
        price,
        discount,
        expirydate,
        quantity, } =
      req.body;

    try {
      const newVendor = {
        lotNumber,
        rackNumber,
        productName,
        category,
        vendor,
        name,
        price,
        discount,
        expirydate,
        quantity,
        
      };

      let existing = await Vendor.findOne({ gstnumber });

      if (existing) {
        return res.status(409).json({ message: "Vendor already exists" });
      }

      const vendor = await Vendor.create(newVendor);

      return res.status(201).json({
        message: "Vendor created successfully",
        ok: true,
        data: {
            gstnumber: vendor.gstnumber,
            businessname: vendor.businessname,
            vendorname: vendor.vendorname,
          mobilenumber: vendor.mobilenumber,
          city: vendor.city,
          address: vendor.address,
          email: vendor.email,
          location: vendor.location,
          accountnumber: vendor.accountnumber,
          ifsc: vendor.ifsc,
          aadharupload: vendor.aadharupload
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getVendors: async (req, res) => {
    try {
      const vendors = await Vendor.find();

      return res.status(200).json({ data: vendors, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getVendor: async (req, res) => {
    try {
      const { id } = req.query;

      const vendor = await Vendor.findById(id);

      return res.status(200).json({ data: vendor, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteVendor: async (req, res) => {
    try {
      const { id } = req.query;

      const vendor = await Vendor.findByIdAndDelete(id);

      return res.status(200).json({ data: vendor, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  updateVendor: async (req, res) => {
    try {
      const { id } = req.query;
      const { gstnumber,ifsc,aadharupload ,businessname,accountnumber,location, vendorname,email, mobilenumber, city, address } =
        req.body;

      const vendor = await Vendor.findByIdAndUpdate(
        id,
        {
          gstnumber,
          businessname,
          vendorname,
          mobilenumber,
          city,
          address,
          email,
          location,
          accountnumber,
          ifsc,
          aadharupload
        },
        { new: true }
      );

      return res.status(200).json({ data: vendor, ok: true });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
