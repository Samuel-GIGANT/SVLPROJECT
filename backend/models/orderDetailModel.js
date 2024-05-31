import { Schema, model } from 'mongoose';

const orderDetailSchema = new Schema({
  quantity:{
    type: Number,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product' // Assurez-vous que 'Product' est le nom correct de votre modèle de produits
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order' // Assurez-vous que 'Order' est le nom correct de votre modèle d'ordre
  }
});

const OrderDetail = model("OrderDetail", orderDetailSchema); 
export default OrderDetail; 
