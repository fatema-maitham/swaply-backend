const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SALT_ROUNDS = 10;

const signup = async (req, res) => {
  try {
    const { name, email, password, bio, profileImage } = req.body;

    const userInDatabase = await User.findOne({ email });

    if (userInDatabase) {
      return res.status(409).json({
        err: 'Email already exists',
      });
    }

    const hashedPassword = bcrypt.hashSync(
      password,
      SALT_ROUNDS
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      bio,
      profileImage,
    });

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET
    );

    res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userInDatabase = await User.findOne({ email });

    if (!userInDatabase) {
      return res.status(401).json({
        err: 'Invalid credentials',
      });
    }

    /* =========================================
       CHECK IF USER IS DISABLED
    ========================================= */

    if (!userInDatabase.isActive) {
      return res.status(403).json({
        err: 'Your account has been disabled.',
      });
    }

    const passwordMatches = bcrypt.compareSync(
      password,
      userInDatabase.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        err: 'Invalid credentials',
      });
    }

    const payload = {
      _id: userInDatabase._id,
      name: userInDatabase.name,
      email: userInDatabase.email,
      role: userInDatabase.role,
      profileImage: userInDatabase.profileImage,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET
    );

    res.status(200).json({
      user: userInDatabase,
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

module.exports = {
  signup,
  login,
};
