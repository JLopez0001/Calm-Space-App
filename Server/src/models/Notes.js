import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    content: {type : String},
    therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    qaReviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'QA' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  });
  
 export const Note = mongoose.model('Note', noteSchema);