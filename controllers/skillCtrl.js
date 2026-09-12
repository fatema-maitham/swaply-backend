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

    res.status(200).json({ skill });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};

module.exports = {
  createSkill,
  getSkills,
  getSkill,
};