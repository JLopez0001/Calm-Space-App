import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    
    patientID : {type : Number},
    firstName: {type : String},
    lastName: {type : String},
    phoneNumber: {type : Number},
    address: {type : String},
    therapistID: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' }, // Reference to assigned therapist

  });
  
  export const Patient = mongoose.model('Patient', patientSchema);