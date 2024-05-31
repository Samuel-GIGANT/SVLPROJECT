import mongoose, { model } from 'mongoose';
const { Schema } = mongoose
import { hash } from 'bcrypt';


const userSchema = new Schema({
  //https://mongoosejs.com/docs/schematypes.html
  fullName: String,
  email: String,
  password: String,
  adresse: String,
  tel: Number,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

// Avant de sauvegarder le mot de pass de l'utilisateur dans la base de données, hachez le mot de passe avec hashedPassword
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = model("users", userSchema);
export default User;

