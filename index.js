const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

//  CORS Configuration to match frontend origin
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));


app.use(express.json());

connectDB();

// Routes
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('JewelleryHub backend running');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
