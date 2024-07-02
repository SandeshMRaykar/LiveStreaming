const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const user = new User({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
    });
    await user.save();

    res.send({ message: 'User registered' });
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.send({ token });
});

module.exports = router;
