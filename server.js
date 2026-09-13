/* eslint-disable prefer-destructuring */
require('dotenv').config();
require('./config/database');

const express = require('express');

const app = express();

// Middleware
const cors = require('cors');
const logger = require('morgan');
const isSignedIn = require('./middleware/isSignedIn');
const isAdmin = require('./middleware/isAdmin');

// Routers
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const skillRouter = require('./routes/skillRouter');
const swapRouter = require('./routes/swapRouter');
const reviewRouter = require('./routes/reviewRouter');
const adminRouter = require('./routes/adminRouter');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// ROUTES

// PUBLIC
app.use('/auth', authRouter);

// PROTECTED
app.use(isSignedIn);

app.use('/users', userRouter);
app.use('/skills', skillRouter);
app.use('/swaps', swapRouter);
app.use('/reviews', reviewRouter);

// ADMIN
app.use('/admin', isAdmin, adminRouter);

app.get('/protected', (req, res) => {
  try {
    const userPayload = req.user;

    res.status(200).json({ user: userPayload });
  } catch (error) {
    res.status(500).json({ err: 'Something went wrong' });
  }
});

app.listen(3000, () => {
  console.log('The express app is ready!');
});
