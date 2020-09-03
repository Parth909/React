const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const {check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Test route
// @access  Private (Token is required to access the route)
router.get('/', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/users
// @desc    Authenticate User & Get Token
// @access  Public (Token is not required to access the route)
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],async (req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // 400 - Bad Request
        return res.status(400).json({errors:errors.array()});
    }

    const { email, password} = req.body;

    try{
    // See if user exist
    let user = await User.findOne({email});

    if(!user){
        return res.status(400).json({errors: [ {msg:'Invalid Credentials'} ] });
    }

    // Comparing the entered password with user.password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({errors: [ {msg:'Invalid Credentials'} ] });
    }

    // Return jsonwebtoken
    const payload = {
        user:{
            id:user.id
        }
    }
    
    jwt.sign(
        payload, 
        config.get('jwtSecret'), 
        { expiresIn:36000 },
        (err, token)=>{
            if(err) throw err;
            res.json({token});
        });// while deploying use 3600s - 1hr

    }catch(err){
        console.log(err);
        return res.status(500).send('Server error');
    }

});

module.exports = router;