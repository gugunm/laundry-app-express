const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({
  branchNumber: {
    type: Number,
    required: true,
  },
  noFaktur: {
    type: String,
    required: true,
  },
  totalHarga: {
    type: Number,
    required: true,
  },
  parfum: {
    type: String,
    required: true,
  },
  paket: {
    type: String,
    required: true,
  },
  tipeBayar: {
    type: String,
    required: true,
  },
  uangCustomer: {
    type: Number,
    required: true,
  },
  sisaBayar: {
    type: Number,
    required: true,
  },
  totalItem: {
    type: Number,
    required: true,
  },
  customer: {
    _id: {
      type: Schema.Types.ObjectId,
    },
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
  },
  items: [
    {
      _id: {
        type: Schema.Types.ObjectId,
      },
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
      qty: {
        type: Number,
        required: true,
      },
      keterangan: {
        type: String,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  checkoutDate: {
    type: Date,
  },
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);

// SCHEMA
/*
{
  id,
  branchId,
  transactions : [
    {
      id,
      totalHarga,
      parfum,
      paket,
      tipeBayar,
      uangCustomer,
      sisaBayar,
      totalItem,
      customer: {
        id,
        nama,
        ponsel,
      },
      items,
      startDate,
      endDate,
      status,
      checkoutDate (sehabis checkout)
    }
  ]
}
*/
