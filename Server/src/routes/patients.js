import express from "express";
import { Patient } from "../models/Patients.js";
import { Therapist } from "../models/Therapist.js";
import { Note } from "../models/Notes.js";
import { QA } from "../models/QA.js";
import { User } from "../models/Users.js";


const router = express.Router();

const generatePatientID = async () => {
    let code;
    do {
      code = Math.floor(10000 + Math.random() * 900000); // Generates a random 6-digit number
    } while (await Patient.findOne({ patientID: code })); // Check if the code is already in use
    return code;
};


router.post("/create-patient", async (req,res) =>{
    try {
        
        const { firstName, lastName, phoneNumber, address, therapistProviderCode } = req.body;

        // Check if therapistId is valid
        const therapist = await Therapist.findOne({providerCode : therapistProviderCode});

        if (!therapist) {
        return res.status(400).json({ message: 'Invalid therapist ID' });
        };

        const patientID = await generatePatientID();

        // Create a new patient
        const newPatient = new Patient({
        patientID: patientID,
        firstName : firstName,
        lastName : lastName,
        phoneNumber : phoneNumber,
        address : address,
        therapistID: therapist._id,
        });

        await newPatient.save();

        // Update therapist's assignedPatients array
        therapist.assignedPatients.push(newPatient._id);
        await therapist.save();

        res.json({ message: 'Patient created and assigned to therapist successfully!' });

    } catch (error) {
        console.error(error)
    }
});

router.post("/create-note", async (req, res) => {
    try {

        `TODO goal/objective populated logic instead of writing the goals.`
        //goal/objective populated
        const { content, appointmentDate, service, goals, riskAssessmentChecked, patientId, therapistProviderCode, qaProviderCode } = req.body;

        // Check if any of the required fields are missing
        if (!content || !appointmentDate || !service || !goals || !riskAssessmentChecked || !patientId || !therapistProviderCode || !qaProviderCode) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const therapist = await Therapist.findOne({providerCode : therapistProviderCode});
        const patient = await Patient.findOne({patientID : patientId});
        const qa = await QA.findOne({providerCode : qaProviderCode});

        // Check if the therapist is assigned to the patient
        if (patient.therapistID.equals(therapist._id)) {
            // The therapist is assigned to the patient, so they can create the note
            const newNote = new Note({
                content,
                appointmentDate,
                service,
                goals,
                riskAssessment: {
                    checked: riskAssessmentChecked
                },
                qaReviewer: qa._id,
                therapist: therapist._id,
                patient: patient._id,
                status: 'pending',
            });

            await newNote.save();

            return res.json({ message: 'Note created successfully!' });
        } else {
            // The therapist is not assigned to the patient, so they are not authorized
            return res.status(403).json({ message: 'You are not authorized to create a note for this patient.' });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the note' });
    };
});


// Get all patients assigned to the therapist._id
router.get("/patients/:therapistID", async (req, res) => {
   try {
        const patients = await Patient.find({therapistID : req.params.therapistID});
        res.json(patients);
   } catch (error) {
        res.json({message : error});
   } 
});

// Get a patient by patient ID
router.get("/patient/:patientID", async (req, res) => {
    try {
        const patient = await Patient.findOne({ patientID: req.params.patientID });
        const notes = await Note.find({ patient: patient._id });
        res.json({ patient, notes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/patient/add-diagnosis/:patientID", async (req, res) => {
    try {
        const { diagnosis, icd10 } = req.body;
        const patient = await Patient.findOneAndUpdate(
            { patientID: req.params.patientID },
            { 
                $push: { 
                    diagnoses: {
                        diagnosis,
                        icd10
                    } 
                } 
            },
            { new: true }
        );
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a patient by patient ID or patient name and return patient name and patient ID
router.get("/search-patient/:searchOption/:query", async (req, res) => {
    try {
        const { searchOption, query } = req.params;
        let patients;

        if (searchOption === 'fullName') {
            // Search by patient name
            const [firstName, lastName] = query.split(' ');
            patients = await Patient.find({ firstName, lastName });
        } else {
            // Search by patient ID
            patients = await Patient.find({ patientID: query });
        }

        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export { router as patientRouter };

