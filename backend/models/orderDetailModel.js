import { Schema, model } from 'mongoose';

const orderDetailSchema = new Schema({
  quantity:{
    type: Number,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product' 
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order' 
  }
});

const OrderDetail = model("OrderDetail", orderDetailSchema); 
export default OrderDetail; 
