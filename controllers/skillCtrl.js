const Skill = require('../models/skill');

const createSkill = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    const skill = await Skill.create({
      name,
      description,
      category,
      owner: req.user._id,
    });

    res.status(201).json({ skill });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    res.status(200).json({ skills });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ err: 'Skill not found' });
    }

    res.status(200).json({ skill });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ err: 'Skill not found' });
    }

    if (skill.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        err: 'You can only edit your own skills',
      });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ skill: updatedSkill });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ err: 'Skill not found' });
    }

    if (skill.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        err: 'You can only delete your own skills',
      });
    }

    await Skill.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Skill deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

module.exports = {
  createSkill,
  getSkills,
  getSkill,
  updateSkill,
  deleteSkill,
};