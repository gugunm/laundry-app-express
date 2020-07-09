const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect to database
connectDB();

// init middleware
app.use(express.json({ extended: false }));
app.use(cors());
// app.use(cors({
//   origin: 'https://campuslaundry.netlify.app'
// }));

app.get('/', (req, res, next) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/customers', require('./routes/api/customers'));
app.use('/api/services', require('./routes/api/services'));
app.use('/api/transactions', require('./routes/api/transactions'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
