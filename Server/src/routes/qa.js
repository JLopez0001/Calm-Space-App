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
                                .populate('patient', 'firstName lastName');  
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
                               .populate('patient', 'firstName lastName');
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export { router as qaRouter}