const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  branchNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model('user', UserSchema);

// SCHEMA
/*
{
  id,
  nama,
  email,
  password,
  branchId,
  date
}
*Bisa add user pake key rahasia dan di limit (kayak di group cpns)
*/
