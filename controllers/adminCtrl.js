const User = require('../models/user');
const Skill = require('../models/skill');
const Swap = require('../models/swap');
const Review = require('../models/review');

const dashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const skills = await Skill.countDocuments();
    const swaps = await Swap.countDocuments();
    const reviews = await Review.countDocuments();

    res.status(200).json({
      statistics: {
        users,
        skills,
        swaps,
        reviews,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate('owner', 'name');

    res.status(200).json({ skills });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const getSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find()
      .populate('requester', 'name')
      .populate('receiver', 'name')
      .populate('skillOffered', 'name')
      .populate('skillRequested', 'name');

    res.status(200).json({ swaps });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.status(200).json({ reviews });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.skillId);

    if (!skill) {
      return res.status(404).json({ err: 'Skill not found' });
    }

    res.status(200).json({
      message: 'Skill deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ err: 'Review not found' });
    }

    res.status(200).json({
      message: 'Review deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

module.exports = {
  dashboard,
  getUsers,
  getSkills,
  getSwaps,
  getReviews,
  deleteUser,
  deleteSkill,
  deleteReview,
};