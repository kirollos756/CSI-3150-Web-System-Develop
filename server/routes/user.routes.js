const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Make sure to import your user model

// Handle user registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log(`Username already taken: ${username}`);
            return res.status(409);
        }

        // Create and save the new user
        const newUser = new User({
            username,
            password,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error while registering user:', error);
        res.status(500).json({ message: 'An error occurred while registering user' });
    }
});


router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log(`Attempting sign-in for user: ${username}`);
        const user = await User.findOne({ username });
        if (!user) {
            console.log(`User not found: ${username}`);
            return res.json({ userId: 0 }); // Set userId to 0 for invalid attempt
        }

        if (user.password !== password) {
            console.log(`Incorrect password for user: ${username}`);
            return res.json({ userId: 0 }); // Set userId to 0 for incorrect password
        }

        console.log(`Successful sign-in for user: ${username}`);
        // Assuming user._id is the user's unique identifier
        return res.json({ userId: user._id });
    } catch (error) {
        console.error('Error occurred during sign-in:', error);
        return res.json({ userId: 0 });
    }
});



module.exports = router;
