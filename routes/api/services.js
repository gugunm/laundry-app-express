const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Service = require('../../models/Service');

// @route     GET api/services
// @desc      Get services
// @access    Private
router.get('/', auth, async (req, res, next) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/services
// @desc     Create a service
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('nama', 'Nama is required').not().isEmpty(),
      check('satuan', 'Satuan is required').not().isEmpty(),
      check('harga', 'Harga is required').isNumeric(),
      check('durasi', 'Durasi is required').isNumeric(),
    ],
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nama, satuan, harga, durasi } = req.body;

    const newService = new Service({
      nama,
      satuan,
      harga,
      durasi,
    });

    try {
      const service = await newService.save();
      res.json(service);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     EDIT api/services/:id
// @desc      Edit service by service_id
// @access    Private
router.put(
  '/:id',
  [
    auth,
    [
      check('nama', 'Nama is required').not().isEmpty(),
      check('satuan', 'Satuan is required').not().isEmpty(),
      check('harga', 'Harga is required').isNumeric(),
      check('durasi', 'Durasi is required').isNumeric(),
    ],
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nama, satuan, harga, durasi } = req.body;

    const updateFields = {
      nama,
      satuan,
      harga,
      durasi,
    };

    const query = { _id: req.params.id };

    try {
      // Edit Service
      const service = await Service.findOneAndUpdate(query, updateFields, {
        new: true,
      });
      res.json(service);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE api/services/:id
// @desc      Delete service by service_id
// @access    Private
router.delete('/:id', auth, async (req, res, next) => {
  try {
    // Remove Service
    await Service.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Service deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
