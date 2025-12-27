import mongoose, { Schema, Document, Model } from "mongoose";
import { BSON } from "bson";

// 1. Define an Interface for the Product sub-document
interface IProduct {
  name: string;
  quantity: number;
  total: mongoose.Types.Decimal128;
}

// 2. Define an Interface for the Purchase Order document
interface IPurchaseOrder extends Document {
  orderDate: Date;
  status: "Pending" | "Delivered";
  products: IProduct[];
  subtotal: mongoose.Types.Decimal128;
  tax: mongoose.Types.Decimal128;
  total: mongoose.Types.Decimal128;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Product Schema
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required."],
      min: [0, "Quantity cannot be less than 0."],
    },
    total: {
      type: mongoose.SchemaTypes.Decimal128,
      required: [true, "Product amount is required."],
      min: [0, "Amount cannot be less than 0."],
    },
  },
  { _id: false }
);

// Purchase Order Schema
const purchaseOrderSchema = new Schema<IPurchaseOrder>(
  {
    orderDate: {
      type: Date,
      required: [true, "Order date is required."],
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "Delivered"],
        message: "Order status must only be Pending or Delivered.",
      },
      required: [true, "Order status is required."],
    },
    products: {
      type: [productSchema],
      required: [true, "Order Products is required."],
      validate: {
        validator: function (value: IProduct[]) {
          return value.length > 0;
        },
        message: "Order Products cannot be empty.",
      },
    },
    subtotal: {
      type: mongoose.SchemaTypes.Decimal128,
      required: [true, "Order subtotal is required."],
      min: [0, "Subtotal cannot be less than 0"],
    },
    tax: {
      type: mongoose.SchemaTypes.Decimal128,
      required: [true, "Order tax is required."],
      min: [0, "Order tax cannot be less than 0"],
    },
    total: {
      type: mongoose.SchemaTypes.Decimal128,
      required: [true, "Order total is required."],
      min: [0, "Order total cannot be less than 0"],
    },
    note: String,
  },
  { timestamps: true }
);

// 3. Explicitly type the Model export to satisfy the TS compiler
const PurchaseOrder: Model<IPurchaseOrder> = mongoose.model<IPurchaseOrder>(
  "product_orders",
  purchaseOrderSchema
);

export default PurchaseOrder;
