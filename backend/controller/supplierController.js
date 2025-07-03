const Supplier = require("../models/Supplier");

const addSupplier = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).send({ message: "Supplier Added Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({})
      .sort({ _id: -1 })
      .populate("productsSupplied", "name");
    res.send(suppliers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate(
      "productsSupplied",
      "name"
    );
    if (!supplier) {
      return res.status(404).send({ message: "Supplier not found" });
    }
    res.send(supplier);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).send({ message: "Supplier not found" });
    }
    supplier.name = req.body.name || supplier.name;
    supplier.contactPerson = req.body.contactPerson || supplier.contactPerson;
    supplier.address = req.body.address || supplier.address;
    supplier.phone = req.body.phone || supplier.phone;
    supplier.email = req.body.email || supplier.email;
    supplier.productsSupplied =
      req.body.productsSupplied || supplier.productsSupplied;

    await supplier.save();
    res.send({ message: "Supplier Updated Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const result = await Supplier.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Supplier not found" });
    }
    res.status(200).send({ message: "Supplier Deleted Successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getSupplierProducts = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate(
      "productsSupplied",
      "sku name slug category prices quantity expiryDate description tag status requiresPrescription"
    );
    if (!supplier) {
      return res.status(404).send({ message: "Supplier not found" });
    }
    res.send(supplier.productsSupplied);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  addSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  getSupplierProducts,
};
