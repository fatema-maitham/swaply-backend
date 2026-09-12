const User = require('../models/user');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

module.exports = {
  getUser,
  updateUser,
};