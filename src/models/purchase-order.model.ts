import mongoose from "mongoose";

// This schema is only for the products array of
// Purchase Order Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    amount: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
  },
  { _id: false },
);

// Values subject to change
const purchaseOrderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Delivered"],
    required: true,
  },
  products: [productSchema],
  subtotal: {
    type: mongoose.SchemaTypes.Decimal128,
    required: true,
  },
  tax: {
    type: mongoose.SchemaTypes.Decimal128,
    required: true,
  },
  total: {
    type: mongoose.SchemaTypes.Decimal128,
    required: true,
  },
  note: String,
});
purchaseOrderSchema.set("timestamps", true);

// If this line gets highlighted by the LSP, ignore it. It's
// a mongoose/typescript bug when using Decimal128
const PurchaseOrder = mongoose.model("product_orders", purchaseOrderSchema);

export default PurchaseOrder;
