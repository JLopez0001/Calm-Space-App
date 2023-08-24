import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Therapist } from "../models/Therapist.js";
import { QA } from "../models/QA.js";
import { User } from "../models/Users.js"; 

const router = express.Router();

const generateRandomCode = async () => {
    let code;
    do {
      code = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    } while (await User.findOne({ providerCode: code })); // Check if the code is already in use
    return code;
};

// REGISTRATION //

router.post('/register', async (req, res) => {

  try {
    const {email,password,role,userName} = req.body;

    //Check to see if unique username is taken
    const existingUser = await User.findOne({userName});
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    };

    //Check to see if password is longer than 6 characters
    if(password.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters long"});
    };

    // Password Encryption.
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);

    // Generate a unique providerCode
    const providerCode = await generateRandomCode();

    //general variable to be used to save new users. Either QA or therapist
    let newUser;
    if (role === "therapist") {
      newUser = new Therapist({
        providerCode: providerCode,
        email: email,
        password: hashedPassword,
        userName: userName,
        role: role,
      });
    } else if (role === "qa") {
      newUser = new QA({
        providerCode: providerCode,
        email: email,
        password: hashedPassword,
        userName: userName,
        role: role,
      });

    } else {
      return res.status(400).json({ message: "Invalid role" });
    };

    await newUser.save();
    console.log(newUser);

    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ err: "Registration failed" });
  }
});

// LOGIN //

router.post("/login", async(req,res) => {
  try {
      const {userName, password} = req.body;
      const user = await User.findOne({ userName });

      if(!user && !password){
          return res.json({message: "Please Fill Out All Fields"});
      }
       else if(!user){
          return res.json({message: "User Doesn't Exist"});
      } else if(!password){
          return res.json({message: "Enter A Password"});
      };

      //finds and compares password of user
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if(!isPasswordValid){
          return res.json({message:"Username or Password Is Incorrect"});
      } 
      else if(isPasswordValid){
        //Once password is authenticated we send a token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token, 
            userID : user._id,
            message : "Logged In Successfully"
        });
      };

  } catch (error) {
      console.error(error);
  };
  
});

const verifyToken = (req,res,next) => {
  const token = req.headers.authorization;
  if(token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
          if(err) return res.sendStatus(403);
          next()
      });
  } else {
      res.sendStatus(401);
  };
};

export {verifyToken}
export { router as userRouter };
