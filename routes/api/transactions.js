const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route     GET api/transactions
// @desc      Get current transaction base on branchNumber
// @access    Private
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const { branchNumber } = user;

    // kalo branch === -1 ambil semua transaksi
    let transactions;
    if (branchNumber === -1) {
      transactions = await Transaction.find();
    } else {
      transactions = await Transaction.find({ branchNumber });
    }

    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/transactions
// @desc      Create or update transaction base on branchNumber atau semua jika branch numbernya 0
// @access    Private
router.post('/', auth, async (req, res, next) => {
  // get data from body
  const {
    noFaktur,
    totalHarga,
    parfum,
    paket,
    tipeBayar,
    uangCustomer,
    sisaBayar,
    totalItem,
    customer,
    items,
    startDate,
    endDate,
  } = req.body;

  // get user for branch number
  const user = await User.findById(req.user.id);

  // Build transaction object
  const transactionFields = {
    branchNumber: user.branchNumber,
    noFaktur,
    totalHarga,
    parfum,
    paket,
    tipeBayar,
    uangCustomer,
    sisaBayar,
    totalItem,
    customer,
    items,
    startDate,
    endDate,
  };

  try {
    // Create a transaction
    const transaction = new Transaction(transactionFields);
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/transactions/checkout/:id
// @desc      Checkout a transaction
// @access    Private
router.put(
  '/checkout/:id',
  [auth, checkObjectId('id')],
  async (req, res, next) => {
    const updateFields = {
      checkoutDate: Date.now(),
    };

    const query = { _id: req.params.id };

    try {
      // Checkout Transaction
      const transaction = await Transaction.findOneAndUpdate(
        query,
        updateFields,
        {
          new: true,
        }
      );
      res.json(transaction);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .send(`Server Error dengan branch number : ${user.branchNumber}`);
    }
  }
);

module.exports = router;
