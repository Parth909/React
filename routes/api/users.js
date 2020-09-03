const express = require('express');
const router = express.Router();
const gravatar =  require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const {check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register User
// @access  Public (Token is required to access the route)
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min:6})
],async (req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // 400 - Bad Request
        return res.status(400).json({errors:errors.array()});
    }

    const {name, email, password} = req.body;

    try{
    // See if user exist
    let user = await User.findOne({email});

    if(user){
        return res.status(400).json({errors: [ {msg:'User already exists'} ] });
    }

    // Get the user gravatar
    const avatar = gravatar.url(email, {
        s:'200',//size:200
        r:'pg',//to avoid censored images
        d:'mm'
    });

    user = new User({
        name,
        email,
        avatar,
        password
    });

    // Encrypt password (more the no more secure but it will be slower)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save(); // anything that uses a promise put await before it

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
        console.error(err.message);
        return res.status(500).send('Server error');
    }

}

)

module.exports = router;