const express = require('express');
const jwt = require('jsonwebtoken');
const router  = express.Router();
const User    = require('../models/user');
router.get('/', (req, res) => {
    res.send('Hello From Api Route');
});

// =====================
// Verify Token
// ====================

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Un Authorized Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Un Authorized Request') 
    }
    let payload = jwt.verify(token, 'secretkey')
    if(!payload){
        return res.status(401).send('Un Authorized Request') 
    }
    req.userId = payload.subject
    next()
}

// =================
// Register New User
// =================
router.post('/register', async(req, res) => {
    let userData = req.body;
    let user = new User(userData);
    await user.save((err, registerUser) => {
        if(err){
            existEmail = User.findOne(req.body.email);
            if(existEmail){
                return res.send({success: false, message: 'Email Already Register'})
            }else{
                return res.status(400).json({success : false, message: 'There is An Error!'})
            }
        }else{
            const payload = { subject: registerUser._id};
            const token   = jwt.sign(payload, 'secretkey');
            res.status(200).json({success: true, message: 'User Register Successfully.!', data: registerUser, token: token});
        }
    });
});
// ==========
// Login User
// ==========
router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) => {
        if(err){
            return res.status(400).json({success: false, message: 'There Is An Error', err});
        }else{
            if(!user){
                return res.status(401).json({success: false, message: 'Invalid Email'});
            }else{
                if(user.password !== userData.password){
                    return res.status(401).json({success: false, message: 'Invalid Password'})
                }else{
                    let payload = { subject: user._id};
                    let token   = jwt.sign(payload, 'secretkey')
                    res.status(200).json({succsess: true, message: 'Login Succssfully1', data: user, token: token});
                }
            }
        }
    });
});

// ======
// Event 
// ======
router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "auto expo",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        },
        {
            "_id": "2",
            "name": "auto expo1",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        },
        {
            "_id": "3",
            "name": "auto expo2",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        },
        {
            "_id": "4",
            "name": "auto expo3",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        },
        {
            "_id": "5",
            "name": "auto expo4",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        },
        {
            "_id": "6",
            "name": "auto expo5",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        }
    ];
   return res.status(200).json(events);
});
// =============
// Special Event 
// =============
router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "auto expo",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        },
        {
            "_id": "2",
            "name": "auto expo1",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        },
        {
            "_id": "3",
            "name": "auto expo2",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        },
        {
            "_id": "4",
            "name": "auto expo3",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        },
        {
            "_id": "5",
            "name": "auto expo4",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        },
        {
            "_id": "6",
            "name": "auto expo5",
            "description": "lorem ipsum io ",
            "date": "2021-7-12"
        }
    ];
   return res.status(200).json(events);
});
module.exports = router;