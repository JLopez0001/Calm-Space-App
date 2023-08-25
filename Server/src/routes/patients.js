import express from "express";
import { Patient } from "../models/Patients.js";
import { Therapist } from "../models/Therapist.js";
import { User } from "../models/Users.js";


const router = express.Router();

const generatePatientID = async () => {
    let code;
    do {
      code = Math.floor(10000 + Math.random() * 900000); // Generates a random 5-digit number
    } while (await Patient.findOne({ patientID: code })); // Check if the code is already in use
    return code;
};


router.post("/create-patient", async (req,res) =>{
    try {
        
        const { firstName, lastName, phoneNumber, address, therapistProviderCode } = req.body;

        // Check if therapistId is valid
        const therapist = await Therapist.findOne({providerCode : therapistProviderCode});
        console.log(therapist)

        if (!therapist) {
        return res.status(400).json({ message: 'Invalid therapist ID' });
        }


        const patientID = await generatePatientID();

        console.log(patientID)

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


export { router as patientRouter };

