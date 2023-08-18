import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Therapist } from "../models/Therapist.js";
import { User } from "../models/Users.js"; 

const router = express.Router();

const generateRandomCode = async () => {
    let code;
    do {
      code = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    } while (await User.findOne({ providerCode: code })); // Check if the code is already in use
    return code;
  };

router.get('/home', async(req,res) => {
    res.json("Hello")
});

router.post('/register', async (req, res) => {

  try {
    const {email,password,role,userName} = req.body;

    //Check to see if unique username is taken
    const existingUser = await User.find({userName})
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Password Encryption.
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt)

    //general variable to be used to save new users. Either QA or therapist
    let newUser;
    if (role === "therapist") {
      newUser = new Therapist({
        providerCode: generateRandomCode(),
        email: email,
        password: hashedPassword,
        userName: userName,
        role: role,
      });
    } else if (role === "qa") {
      newUser = new QA({
        providerCode: generateRandomCode(),
        email: email,
        password: hashedPassword,
        userName: userName,
        role: role,
      });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }
    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ err: "Registration failed" });
  }
});

export { router as userRouter };
