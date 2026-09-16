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

<<<<<<< Updated upstream
    res.status(201).json({ swap });
=======
    const populatedSwap = await Swap.findById(swap._id)
      .populate('requester', 'name email profileImage')
      .populate('receiver', 'name email profileImage')
      .populate(
        'skillOffered',
        'name description category skillImage'
      )
      .populate(
        'skillRequested',
        'name description category skillImage'
      );

    res.status(201).json({ swap: populatedSwap });
>>>>>>> Stashed changes
  } catch (err) {
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const getSwaps = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const swaps = await Swap.find();
=======
    const swaps = await Swap.find({
      $or: [
        { requester: req.user._id },
        { receiver: req.user._id },
      ],
    })
      .sort({ createdAt: -1 })
      .populate('requester', 'name email profileImage')
      .populate('receiver', 'name email profileImage')
      .populate(
        'skillOffered',
        'name description category skillImage'
      )
      .populate(
        'skillRequested',
        'name description category skillImage'
      );

>>>>>>> Stashed changes
    res.status(200).json({ swaps });
  } catch (err) {
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const getSwap = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const swap = await Swap.findById(req.params.id);
=======
    const swap = await Swap.findById(req.params.id)
      .populate('requester', 'name email profileImage')
      .populate('receiver', 'name email profileImage')
      .populate(
        'skillOffered',
        'name description category skillImage'
      )
      .populate(
        'skillRequested',
        'name description category skillImage'
      );

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    );
=======
    )
      .populate('requester', 'name email profileImage')
      .populate('receiver', 'name email profileImage')
      .populate(
        'skillOffered',
        'name description category skillImage'
      )
      .populate(
        'skillRequested',
        'name description category skillImage'
      );
>>>>>>> Stashed changes

    res.status(200).json({ swap });
  } catch (err) {
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const deleteSwap = async (req, res) => {
  try {
    await Swap.findByIdAndDelete(req.params.id);
<<<<<<< Updated upstream
    res.status(200).json({ message: 'Swap deleted successfully' });
=======

    res.status(200).json({
      message: 'Swap deleted successfully',
    });
>>>>>>> Stashed changes
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