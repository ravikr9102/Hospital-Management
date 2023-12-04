var express = require('express');
var router = express.Router();

var Doctor = require('../models/Doctor');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ message: 'Doctors Information' });
});

// registration handler
router.post('/doctor/register', async (req, res, next) => {
  try {
    var doctor = await Doctor.create(req.body);
    console.log(doctor);
    var token = await doctor.signToken();
    res.status(201).json({ doctor: doctor.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

// login handler
router.post('/doctor/login', async (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email/Password required' });
  }
  try {
    var doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ error: 'Email not registered' });
    }
    var result = await doctor.verifyPassword(password);
    console.log(doctor, result);
    if (!result) {
      return res.status(400).json({ error: 'Invalid Password' });
    }
    // generate token
    var token = await doctor.signToken();
    console.log(token);
    res.json({ doctor: doctor.userJSON(token) });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
