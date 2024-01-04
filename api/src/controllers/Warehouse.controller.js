import Warehouse from "../models/Warehouse.js";
import Products from "../models/Products.js";

import PDFDocument from 'pdfkit';

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
      const warehouses = await Warehouse.find({}).populate("products");

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

  // generateReports: async (req, res) => {
  //   try {
  //     // Fetch the warehouse data (you might need to modify this based on your actual models)
  //     const warehouses = await Warehouse.find().populate('products');
      
  //     // Create a new PDF document
  //     const doc = new PDFDocument();
    
  //     // Pipe the PDF to the response
  //     res.setHeader('Content-Type', 'application/pdf');
  //     res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
  //     doc.pipe(res);
  
  //     // Add content to the PDF based on the fetched warehouse data
  //     warehouses.forEach((warehouse, index) => {
  //       doc.fontSize(16).text(`Warehouse: ${warehouse.name}`);
  //       doc.fontSize(12).text(`Location: ${warehouse.location}`);
  //       doc.fontSize(12).text(`Manager Name: ${warehouse.managername}`);
  //       // Add other relevant information...
  
  //       // Add product information
  //       doc.moveDown();
  //       doc.fontSize(14).text('Products:');
  
  //       const table = {
  //         headers: ['Product Name', 'Quantity'], // Add other headers as needed
  //         rows: warehouse.products.map(product => [product.name, product.quantity]) // Adjust based on your actual product properties
  //       };
  
  //       doc.table(table, {
  //         prepareHeader: () => doc.font('Helvetica-Bold'),
  //         prepareRow: (row, i) => doc.font('Helvetica').fontSize(12),
  //         didDrawCell: (data) => {
  //           // You can customize cell styling here
  //         }
  //       });
  
  //       // Move to the next page if there are more warehouses
  //       if (index !== warehouses.length - 1) {
  //         doc.addPage();
  //       }
  //     });
  
  //     // End the PDF document
  //     doc.end();
  //   } catch (e) {
  //     return res.status(500).json({ message: e.message, ok: false });
  //   }
  // },
  
  generateReports: async (req, res) => {
    try {
      // Fetch the warehouse data (you might need to modify this based on your actual models)
      const warehouses = await Warehouse.find().populate('products');
      
      // Create a new PDF document
      const doc = new PDFDocument();
  
      // Pipe the PDF to the response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
      doc.pipe(res);
  
      // Add content to the PDF based on the fetched warehouse data
      warehouses.forEach((warehouse) => {
        doc.fontSize(16).text(`Warehouse: ${warehouse.name}`);
        doc.fontSize(12).text(`Location: ${warehouse.location}`);
        doc.fontSize(12).text(`Manager Name: ${warehouse.managername}`);
        doc.fontSize(12).text(`Mobile Number: ${warehouse.mobilenumber}`);
        doc.fontSize(12).text(`City: ${warehouse.city}`);
        doc.fontSize(12).text(`Address: ${warehouse.address}`);
        // Add other relevant information...
  
        // Add product information
        doc.moveDown();
        doc.fontSize(14).text('Products:');
        warehouse.products.forEach((product) => {
          doc.fontSize(12).text(`Product Name: ${product.name}`);
          doc.fontSize(12).text(`Quantity: ${product.quantity}`);
          // Add other relevant product information...
          doc.moveDown();
        });
  
        // Move to the next page if there are more warehouses
        if (warehouse !== warehouses[warehouses.length - 1]) {
          doc.addPage();
        }
      });
  
      // End the PDF document
      doc.end();
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  },

  getReports: async (req, res) => {
    try {
      const warehouseId = req.query.id;
  
      // Fetch the warehouse data
      const warehouse = await Warehouse.findById(warehouseId).populate('products');
  
      if (!warehouse) {
        return res.status(404).json({ message: 'Warehouse not found', ok: false });
      }
  
      // Generate PDF document
      const doc = new PDFDocument();
  
      // Add content to the PDF based on the warehouse data
      doc.fontSize(16).text(`Warehouse: ${warehouse.name}`);
      doc.fontSize(12).text(`Location: ${warehouse.location}`);
      doc.fontSize(12).text(`Manager Name: ${warehouse.managername}`);
      // Add other relevant information...
  
      // Add product information
      doc.moveDown();
      doc.fontSize(14).text('Products:');
      warehouse.products.forEach((product) => {
        doc.fontSize(12).text(`Product Name: ${product.name}`);
        doc.fontSize(12).text(`Quantity: ${product.quantity}`);
        // Add other relevant product information...
        doc.moveDown();
      });
  
      // Set response headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=warehouse_report_${warehouseId}.pdf`);
  
      // Pipe the PDF to the response
      doc.pipe(res);
  
      // End the PDF document
      doc.end();
    } catch (e) {
      return res.status(500).json({ message: e.message, ok: false });
    }
  }
};
