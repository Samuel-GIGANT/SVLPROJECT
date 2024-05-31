import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  total_Amount: {
    type: Number,
    required: true, // Validation to ensure the total amount is provided
    min: 0 // Ensure the total amount is non-negative
  },
  order_Status: {
    type: String,
    required: true, // Validation to ensure the order status is provided
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], // Example of status options
    default: 'Pending' // Default status
  },
  order_Date: {
    type: Date,
    default: Date.now, // Default to the current date if not provided
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true // Ensure the order is associated with a user
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Ensure this matches the name of your product model
    required: true // Ensure the order is associated with a product
  }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
