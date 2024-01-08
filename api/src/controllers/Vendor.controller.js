import Vendor from "../models/Vendor.js";
import { deleteFile } from "../middlewares/upload.js";
import Product from "../models/Products.js";


export const VendorController = {
  createVendor: async (req, res) => {
    const {
      gstnumber,
      businessname,
      vendorname,
      mobilenumber,
      email,
      location,
      city,
      address,
      bankdetails,
      kyc,
      products,
    } = req.body;
  
    try {
      const newVendor = {
        gstnumber,
        businessname,
        vendorname,
        mobilenumber,
        email,
        location,
        city,
        address,
        bankdetails,
        kyc,
      };
  
      const existing = await Vendor.findOneAndUpdate(
        { gstnumber },
        { $setOnInsert: newVendor },
        { upsert: true, new: true }
      );
  
      const vendor = existing;
      const vendorProducts = products.map((product) => ({
        ...product,
        vendor: vendor._id,
      }));
  
      // Assuming there is a Product model defined
      const createdProducts = await Product.insertMany(vendorProducts);
      const productIds = createdProducts.map((product) => product._id);
  
      vendor.products = productIds;
      await vendor.save();
  
      return res.status(201).json({
        message: 'Vendor created successfully',
        ok: true,
        data: {
          gstnumber: vendor.gstnumber,
          businessname: vendor.businessname,
          vendorname: vendor.vendorname,
          mobilenumber: vendor.mobilenumber,
          email: vendor.email,
          location: vendor.location,
          city: vendor.city,
          address: vendor.address,
        },
      });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
  

  getVendors: async (req, res) => {
    let { page, limit, search, startdate, enddate } = req.query;
    try {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;

      const query = {};
      if (search) {
        query.vendorname = {
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
      const vendors = await Vendor.find(query)
      .skip((page - 1) * limit)
        .limit(limit)
        .populate("products")
        .sort({ createdAt: -1 })
        .exec();

        const count = await Vendor.countDocuments(query);

      return res.status(200).json({ data: vendors, ok: true ,message: "Vendors fetched successfully",count});
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getVendor: async (req, res) => {
    try {
      const { id } = req.query;

      const vendor = await Vendor.findById(id);

      return res.status(200).json({ data: vendor, ok: true,message: "Vendor fetched successfully" });
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  deleteVendor: async (req, res) => {
    try {
      const { id } = req.query;

      const vendor = await Vendor.findByIdAndDelete(id);

      return res.status(200).json({ data: vendor, ok: true,message: "Vendor deleted successfully" });
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

      return res.status(200).json({ data: vendor, ok: true ,message: "Vendor updated successfully"});
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },
};
