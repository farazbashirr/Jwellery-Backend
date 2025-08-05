const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  let { email, password } = req.body;

  email = email?.trim();
  password = password?.trim();

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    console.log(` Login attempt from: ${email}`);

    const user = await User.findOne({ email });

    if (!user) {
      console.log(" No user found");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //  comparison
    const isMatch = password === user.password;
    console.log(" Entered password:", password);
    console.log(" Stored password:", user.password);
    console.log(" Password match:", isMatch);

    if (!isMatch) {
      console.log(" Incorrect password");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(` Login successful for: ${email}`);
    return res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error(" Server error during login:", err.message);
    return res.status(500).json({ message: 'Something went wrong. Try again later.' });
  }
});

module.exports = router;
