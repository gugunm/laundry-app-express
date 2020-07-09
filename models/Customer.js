const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  ponsel: {
    type: String,
    required: true,
  },
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);

// SCHEMA
/*
{
  id,
  nama,
  alamat,
  ponsel
}
*/
