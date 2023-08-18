import mongoose from 'mongoose';
import { User } from './Users.js';

const qaSchema = new mongoose.Schema({
  reviewedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
});

export const QA = User.discriminator('QA', qaSchema);

