const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  satuan: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  durasi: {
    type: Number,
    required: true,
  },
});

module.exports = Service = mongoose.model('service', ServiceSchema);

// SCHEMA
/*
{
  id,
  nama,
  satuan,
  harga,
  durasi
}
*/
