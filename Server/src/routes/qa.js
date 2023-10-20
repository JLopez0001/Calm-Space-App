import express from "express";
import { QA } from "../models/QA.js";
import { Note } from "../models/Notes.js";

const router = express.Router();

//Get all notes that are associated with the QA that is logged in
router.get("/notes/:qaID", async (req, res) => {
    try {
        const qa = await QA.findById(req.params.qaID);
        const notes = await Note.find({ _id: { $in: qa.notesToReview } })
                                .populate('therapist', 'username')  // only fetch the 'username' field from Therapist
                                .populate('patient', 'firstName lastName')
                                .populate('patient', 'firstName lastName patientID');
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Fetch the note that is associated with the noteID
router.get("/note/:noteID", async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteID)
                               .populate('therapist', 'username')
                               .populate('patient', 'firstName lastName')
                               .populate('patient', 'firstName lastName patientID');
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/note/:noteID/approve", async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteID);
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        // Update note status to approved
        note.status = 'approved';
        await note.save();
        
        // Move the note from notesToReview to reviewedNotes for the QA
        const qa = await QA.findById(note.qaReviewer);
        qa.notesToReview = qa.notesToReview.filter(noteId => !noteId.equals(note._id));
        qa.reviewedNotes.push(note._id);
        await qa.save();
        
        res.json({ message: 'Note approved successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/note/:noteID/reject", async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteID);
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        const reason = req.body.reason;  
        
        
        // Update note status to rejected and store rejection reason
        note.status = 'rejected';
        note.rejectionReason = reason; 
        await note.save();
        
        // Move the note from notesToReview to reviewedNotes for the QA
        const qa = await QA.findById(note.qaReviewer);
        qa.notesToReview = qa.notesToReview.filter(noteId => !noteId.equals(note._id));
        qa.reviewedNotes.push(note._id);
        await qa.save();
        
        res.json({ message: 'Note rejected successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { router as qaRouter}