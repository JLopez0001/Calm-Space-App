import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";
import { patientRouter } from "./routes/patients.js";

/* CONFIGURATIONS */
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


/* ROUTES */
app.use("/auth", userRouter);
app.use("/auth", patientRouter);



/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
}).catch((error) => console.log(`Error did not connect: ${error}`));

