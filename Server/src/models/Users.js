import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  providerCode : {type : Number},
  email: {type : String},
  password: { type : String, required : true },
  username: { type : String, required : true , unique: true},
  role: { type : String, required : true, lowercase: true},
});

export const User = mongoose.model('User', userSchema);

