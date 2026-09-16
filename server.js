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

// Controllers

const userCtrl = require('./controllers/userCtrl');

// Routers

const authRouter = require('./routes/authRouter');

const userRouter = require('./routes/userRouter');

const skillRouter = require('./routes/skillRouter');

const swapRouter = require('./routes/swapRouter');

const reviewRouter = require('./routes/reviewRouter');

const adminRouter = require('./routes/adminRouter');

const categoryRoutes = require('./routes/categoryRoutes');

app.use(cors());

app.use(express.json());

app.use(logger('dev'));

// ========================================
// PUBLIC ROUTES
// ========================================

app.use('/auth', authRouter);

app.use('/categories', categoryRoutes);

// Community
app.get('/users', userCtrl.getUsers);

// Skills
app.use('/skills', skillRouter);

// ========================================
// PROTECTED ROUTES
// ========================================

app.use(isSignedIn);

// User account
// /users/profile
app.use('/users', userRouter);

// Swaps
app.use('/swaps', swapRouter);

// Reviews
app.use('/reviews', reviewRouter);

// ========================================
// PUBLIC USER PROFILE
// ========================================

// This MUST come after /users
// so /users/profile goes to userRouter.
app.get('/users/:id', userCtrl.getUserById);

// ========================================
// ADMIN ROUTES
// ========================================

app.use('/admin', isAdmin, adminRouter);

// ========================================
// TEST PROTECTED ROUTE
// ========================================

app.get('/protected', (req, res) => {
  try {
    const userPayload = req.user;

    res.status(200).json({
      user: userPayload,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
});

// ========================================
// START SERVER
// ========================================

app.listen(3000, () => {
  console.log('The express app is ready!');
});