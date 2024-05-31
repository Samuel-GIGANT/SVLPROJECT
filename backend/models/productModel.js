import mongoose from 'mongoose';
const { Schema } = mongoose

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  marque: String,
  price: {
    type: Number,
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

const Product = mongoose.model('Product', productSchema);

export default Product;
