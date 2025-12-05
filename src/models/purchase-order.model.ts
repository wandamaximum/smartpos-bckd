import mongoose from "mongoose";

// Values subject to change
const PurchaseOrderSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["Pending", "Delivered"],
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const PurchaseOrder = mongoose.model("product_orders", PurchaseOrderSchema);

export default PurchaseOrder;
