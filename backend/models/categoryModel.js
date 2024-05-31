import { Schema, model } from 'mongoose'

const categoryShema = new Schema({
  name:String,
  description:String,
})

const category = model("category", categoryShema)
export default category