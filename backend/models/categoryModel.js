import { Schema, model } from 'mongoose'

const categoryShema = new Schema({
  name:String,
  description:String,
})

const Category = model("category", categoryShema)
export default Category