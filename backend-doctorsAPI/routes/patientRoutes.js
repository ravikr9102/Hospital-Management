const router = require('express').Router();
var Patient = require('../models/Patient');

//* @desc      Add a new pateint record
//* @route     POST /api/patient
router.post('/', async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(200).json({ patient });
  } catch (err) {
    return next(err);
  }
});

//* @desc      list of all pateint
//* @route     GET /api/patient
router.get('/', async (req, res, next) => {
  try {
    const patient = await Patient.find();
    res.status(200).json({ patient });
  } catch (err) {
    return next(err);
  }
});

//* @desc      details of a specific patient by its ID
//* @route     GET /api/patient/:id
router.get('/:id', async (req, res, next) => {
  try {
    var id = req.params.id;
    const patient = await Patient.findById(id).lean().exec();
    res.status(200).json({ patient });
  } catch (err) {
    return next(err);
  }
});

//* @desc      Update a patient's details
//* @route     PUT /api/patient/:id/update
router.put('/:id/update', async (req, res, next) => {
  try {
    var id = req.params.id;
    const patient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(patient);
    res.status(200).json({ patient });
  } catch (err) {
    return next(err);
  }
});

//* @desc      Delete a patient record
//* @route     DELETE /api/patient/:id/delete
router.delete('/:id/delete', async (req, res, next) => {
  try {
    var id = req.params.id;
    const patient = await Patient.findByIdAndDelete(id);
    res.status(200).json({ patient });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
