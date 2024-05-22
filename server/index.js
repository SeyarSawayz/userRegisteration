import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { collection } from "./models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./.env",
});
const app = express();

const CLIENT_ORIGIN = "http://localhost:5173";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: CLIENT_ORIGIN }));
app.use(cookieParser());

app.get("/", cors(), (req, res) => {
  res.send("Hi");
  console.log("collection", collection);
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await collection.findOne({ email: email });
  try {
    if (!user) return res.status(404).json({ message: "Something is wrong!" });

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ email }, "secret");
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
        });
        return res.status(200).json({ message: "you can login" });
      } else res.status(400).json({ message: "You can not loging" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/signup", async (req, res) => {
  const { fullName, email, password, gender, birthDate } = req.body;

  const data = {
    fullName,
    email,
    password,
    gender,
    birthDate,
  };
  console.log(data);
  try {
    const userExist = await collection.findOne({ email });
    if (userExist) {
      res.json("User Already registered");
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createdUser = await collection.create({
          fullName,
          email,
          password: hash,
          gender,
          birthDate,
        });
        let token = jwt.sign({ email }, "secret");
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
        });
        console.log(token);
        res.json({
          message: "User registered successfully",
          user: createdUser,
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal errro" });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  console.log("cookie cleared successfully");
  res.status(200).json({ message: "Logout successful" });
});

app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
