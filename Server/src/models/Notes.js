import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({

  riskAssessmentChecked: {
    checked: { type: Boolean, required: true } // SI/HI assessment checkbox, required
  },
  content: { type: String, required: true }, // Content of the note
  appointmentDate: { type: Date, required: true },
  service: {
      type: String,
      enum: ['Individual Psychotherapy 30 min', 'Tele-Audio Individual Psychotherapy 30 min', 'Tele-Video Individual Psychotherapy 30 min'],
      required: true
  }, 
  goals: [{ // Array of goals and objectives
      goal: String, // Goal description
      objective: String, // Objective description
  }],
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  qaReviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'QA' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  rejectionReason: {
    type: String,
    default: null 
  },
});
  
 export const Note = mongoose.model('Note', noteSchema);