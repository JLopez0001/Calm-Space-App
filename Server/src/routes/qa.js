import express from "express";
import { verifyToken } from "./users.js";
import { QA } from "../models/QA.js";
import { Note } from "../models/Notes.js";

const router = express.Router();

//Get all notes that are associated with the QA that is logged in
router.get("/notes/:qaID", verifyToken, async (req, res) => {
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
                               .populate('therapist', 'providerCode')
                               .populate('patient', 'firstName lastName patientID')
                               .populate('qaReviewer', 'providerCode');
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/note/:noteID/approve", verifyToken, async (req, res) => {
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
        
        res.json({ message: 'Note Approved!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/note/:noteID/reject", verifyToken, async (req, res) => {
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
        
        res.json({ message: 'Note Rejected!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//If note is rejected by QA, therapist can edit the note and resubmit it
router.put("/note/:noteID/edit", verifyToken, async (req, res) => {

    try {
        const note = await Note.findById(req.params.noteID);
        
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Update note fields here
        note.riskAssessmentChecked.checked = req.body.riskAssessmentChecked.checked;
        note.content = req.body.content;
        note.appointmentDate = req.body.appointmentDate;
        note.service = req.body.service;
        note.goals = req.body.goals;
        note.therapistProviderCode = req.body.therapistProviderCode;
        note.patientId = req.body.patientId;
        note.qaProviderCode = req.body.qaProviderCode;
        note.status = 'pending';

        await note.save();

        // Move the note back to notesToReview for the QA
        const qa = await QA.findById(note.qaReviewer);
        if (!qa.notesToReview.includes(note._id)) {
            qa.notesToReview.push(note._id);
        }
        // Remove the note from reviewedNotes since it is being reviewed again
        qa.reviewedNotes = qa.reviewedNotes.filter(noteId => !noteId.equals(note._id));
        await qa.save();

        res.json({ message: 'Note edited successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all QA users //

router.get("/get-qa-users", async (req, res) => {
    try {
        const qa = await QA.find({});
        res.json(qa);
    } catch (error) {
        res.json({message : error});
    }
});
export { router as qaRouter}