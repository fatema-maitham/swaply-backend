const Swap = require('../models/swap');

const createSwap = async (req, res) => {
  try {
    const { receiver, skillOffered, skillRequested, scheduledDate } =
      req.body;

    const swap = await Swap.create({
      requester: req.user._id,
      receiver,
      skillOffered,
      skillRequested,
      scheduledDate,
    });

    res.status(201).json({ swap });
  } catch (err) {
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

const getSwap = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    res.status(200).json({ swap });
  } catch (err) {
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const updateSwap = async (req, res) => {
  try {
    const swap = await Swap.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ swap });
  } catch (err) {
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const deleteSwap = async (req, res) => {
  try {
    await Swap.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Swap deleted successfully' });
  } catch (err) {
    res.status(500).json({ err: 'Something went wrong' });
  }
};

module.exports = {
  createSwap,
  getSwaps,
  getSwap,
  updateSwap,
  deleteSwap,
};