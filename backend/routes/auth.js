const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config() // In nodejs it is required to access env variables.
const { body, validationResult } = require('express-validator');
var secretToken = process.env.JWT_TOKEN;

// Route-1 Endpoint to Create a User: POST /api/auth/createuser -- No login required

// Validations on request body.
router.post('/createuser', [body('name').isLength({ min: 3 }).withMessage('Name must contain atleat 3 letters'),
body('email', 'Enter valid email').isEmail(),
body('password', 'password must contain atleast 5 characters.').isLength({ min: 5 })
], async (req, res) => {
    // Check if Validations just above are satisfied.
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            // Find a user with requested email if already exist return status.
            let user = await User.findOne({ email: req.body.email })
            if (user) return res.status(400).json({ msg: "User with this email already exists" })
            let salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, salt);
            // Create a new User.
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            })
            const data = { id: user.id }
            const authToken = jwt.sign(data, secretToken);
            res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: "It's fault on our server's side" })
        }
    }
    else res.send({ errors: result.array() });
})


// Route-2 Endpoint to Login existing User: POST /api/auth/login -- No login required

router.post('/login', [body('email').isEmail().withMessage('Enter a valid email'),
body('password').exists()], async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({ msg: "Login using correct credentials" });
            }
            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                return res.status(400).json({ msg: "Login using correct credentials" });
            }
            const data = {
                id: user.id,
            }
            const authToken = jwt.sign(data, secretToken);

            return res.status(200).json({ success: true, authToken: authToken });

        } catch (error) {
            return res.status(500).json({ err: "It's fault on our server's side", error: error })
        }
    }
    else res.send({ errors: result.array() });
})

// Route-3 Get logged in user details: POST /api/auth/getuser -- Login Required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ err: "It's fault on our server's side" })
    }
})


module.exports = router