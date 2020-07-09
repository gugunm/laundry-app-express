const mongoose = require('mongoose');
const config = require('config');

let db;
if(process.env.NODE_ENV === 'production') {
  db = process.env.mongoURI
}else {
  db = config.get('mongoURI')
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('mongodb connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
