const User = require('../models/user');

const getUser = async (req, res) => {
  try {
    console.log('PROFILE USER:', req.user);

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        err: 'Login Required',
      });
    }

    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({
        err: 'User not found',
      });
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log('GET PROFILE ERROR:', err);

    res.status(500).json({
      err: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ name: 1 });

    res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        err: 'User not found',
      });
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log('UPDATE USER ERROR:', err);

    res.status(500).json({
      err: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      return res.status(404).json({
        err: 'User not found',
      });
    }

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    console.log('DELETE USER ERROR:', err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      role: 'user',
    }).select('name bio profileImage');

    if (!user) {
      return res.status(404).json({
        err: 'User not found',
      });
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log('GET PUBLIC USER ERROR:', err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

module.exports = {
  getUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

