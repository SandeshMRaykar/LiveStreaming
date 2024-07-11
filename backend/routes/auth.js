const express = require("express");
const app = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  await user.save();

  res.send({ message: "User registered" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

module.exports = app;

// const express = require('express');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken'); // For token generation
// const bcrypt = require('bcrypt'); // For password hashing
// const cors = require('cors'); // For handling CORS

// const app = express();
// const port = 5000; // Adjust this to your backend port
// const secretKey = 'your_secret_key'; // Replace with your secret key

// app.use(bodyParser.json());
// app.use(cors());

// // Mock user data
// const users = [
//   {
//     email: 'user@example.com',
//     password: '$2b$10$P0fxeJlUpJ3/cP5RaICFjeCROel4XObuTj8v5i9HqF1SPhkTH1.iK' // Hashed password: "password123"
//   }
// ];

// // Login endpoint
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find(user => user.email === email);

//   if (!user) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
//   res.json({ token });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
