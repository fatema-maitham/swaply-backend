const Skill = require('../models/skill');

const createSkill = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    console.log('SKILL BODY:', req.body);
    console.log('SKILL FILE:', req.file);
    console.log('SKILL USER:', req.user);

    if (!req.file) {
      return res.status(400).json({
        err: 'Skill image is required',
      });
    }

    const skill = await Skill.create({
      name,
      description,
      category,
      skillImage: req.file.path,
      owner: req.user._id,
    });

    const populatedSkill = await Skill.findById(skill._id).populate(
      'owner',
      'name profileImage'
    );

    res.status(201).json({
      skill: populatedSkill,
    });
  } catch (err) {
    console.log('CREATE SKILL ERROR:', err);

    res.status(500).json({
      err: err.message,
    });
  }
};

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
      .sort({ createdAt: -1 })
      .populate(
        'owner',
        'name profileImage'
      );

    res.status(200).json({
      skills,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate(
      'owner',
      'name profileImage'
    );

    if (!skill) {
      return res.status(404).json({
        err: 'Skill not found',
      });
    }

    res.status(200).json({
      skill,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        err: 'Skill not found',
      });
    }

    if (skill.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        err: 'You can only edit your own skills',
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.skillImage = req.file.path;
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    ).populate('owner', 'name profileImage');

    res.status(200).json({
      skill: updatedSkill,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        err: 'Skill not found',
      });
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

    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

module.exports = {
  createSkill,
  getSkills,
  getSkill,
  updateSkill,
  deleteSkill,
};
