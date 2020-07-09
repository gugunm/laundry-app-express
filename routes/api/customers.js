const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Customer = require('../../models/Customer');

// @route     GET api/customers
// @desc      Get customers
// @access    Private
router.get('/', auth, async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/customer
// @desc     Create a customer
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('nama', 'Nama is required').not().isEmpty(),
      check('alamat', 'Alamat is required').not().isEmpty(),
      check('ponsel', 'Ponsel is required').not().isEmpty(),
    ],
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nama, alamat, ponsel } = req.body;

      const newCustomer = new Customer({
        nama,
        alamat,
        ponsel,
      });

      const customer = await newCustomer.save();

      res.json(customer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     EDIT api/customers/:id
// @desc      Edit customer by customer_id
// @access    Private
router.put(
  '/:id',
  [
    auth,
    [
      check('nama', 'Nama is required').not().isEmpty(),
      check('alamat', 'Alamat is required').not().isEmpty(),
      check('ponsel', 'Ponsel is required').not().isEmpty(),
    ],
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nama, alamat, ponsel } = req.body;

    const updateFields = {
      nama,
      alamat,
      ponsel,
    };

    const query = { _id: req.params.id };

    try {
      // Edit Customer
      const customer = await Customer.findOneAndUpdate(query, updateFields, {
        new: true,
      });
      res.json(customer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE api/customers/:id
// @desc      Delete customer by customer id
// @access    Private
router.delete('/:id', auth, async (req, res, next) => {
  try {
    // Remove Customer
    await Customer.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Customer deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
