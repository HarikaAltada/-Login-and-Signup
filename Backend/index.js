const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(express.json());
app.use(cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// Import the Employee model
const EmployeeModel = require("./Models/Employee");
const upload = multer({ storage: storage });
mongoose.connect("mongodb://127.0.0.1:27017/employee");
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email: email });
    if (!user) {
      res.json("No record exists");
      return;
    }

    if (user.password !== password) {
      res.json("The password is incorrect");
      return;
    }

    res.json({
      message: "Success",
      userData: {
        userId: user._id,
        email: user.email,
        profilePhotoUrl: `/uploads/${user.profilePhoto}`, // URL to profile photo
        coverPhotoUrl: `/uploads/${user.coverPhoto}`, // URL to cover photo
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Endpoint to fetch user data by userId
app.post("/register", async (req, res) => {
  EmployeeModel.create(req.body)
    .then((employee) => res.json(employee))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
