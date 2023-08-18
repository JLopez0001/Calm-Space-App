import mongoose from 'mongoose';
import { User } from './Users.js';

const therapistSchema = new mongoose.Schema({
    assignedPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
  });
  
export const Therapist = User.discriminator('Therapist', therapistSchema);
  