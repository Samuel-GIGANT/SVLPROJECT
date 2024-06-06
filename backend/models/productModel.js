import mongoose from 'mongoose';
const { Schema } = mongoose

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  marque: String,
  price: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Product = mongoose.model('Products', productSchema);

export default Product;