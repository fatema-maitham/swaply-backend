const User = require('../models/user');
const Skill = require('../models/skill');
const Swap = require('../models/swap');
const Review = require('../models/review');
const AuditLog = require('../models/auditLog');

const createAuditLog = async ({
  adminId,
  action,
  targetType,
  targetId = null,
  targetName = '',
  details = '',
}) => {
  await AuditLog.create({
    admin: adminId,
    action,
    targetType,
    targetId,
    targetName,
    details,
  });
};

// =========================================
// DASHBOARD
// =========================================

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
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

// =========================================
// USERS
// =========================================

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

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

// =========================================
// SKILLS
// =========================================

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate(
      'owner',
      'name email'
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

// =========================================
// SWAPS
// =========================================

const getSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find()
      .populate('requester', 'name email')
      .populate('receiver', 'name email')
      .populate('skillOffered', 'name')
      .populate('skillRequested', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      swaps,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

// =========================================
// REVIEWS
// =========================================

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('reviewer', 'name email')
      .populate('reviewedUser', 'name email')
      .populate({
        path: 'swap',
        select: 'status skillOffered skillRequested',
        populate: [
          {
            path: 'skillOffered',
            select: 'name',
          },
          {
            path: 'skillRequested',
            select: 'name',
          },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

// =========================================
// ENABLE / DISABLE USER
// =========================================

const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        err: 'User not found',
      });
    }

    user.isActive = !user.isActive;

    await user.save();

    await createAuditLog({
      adminId: req.user._id,
      action: user.isActive
        ? 'Enabled User'
        : 'Disabled User',
      targetType: 'User',
      targetId: user._id,
      targetName: user.name,
      details: user.isActive
        ? `Enabled user account for ${user.email}`
        : `Disabled user account for ${user.email}`,
    });

    res.status(200).json({
      message: user.isActive
        ? 'User enabled successfully'
        : 'User disabled successfully',
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

// =========================================
// DELETE USER
// =========================================

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        err: 'User not found',
      });
    }

    await User.findByIdAndDelete(req.params.userId);

    await createAuditLog({
      adminId: req.user._id,
      action: 'Deleted User',
      targetType: 'User',
      targetId: user._id,
      targetName: user.name,
      details: `Deleted user account ${user.email}`,
    });

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

// =========================================
// DELETE SKILL
// =========================================

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.skillId);

    if (!skill) {
      return res.status(404).json({
        err: 'Skill not found',
      });
    }

    await Skill.findByIdAndDelete(req.params.skillId);

    await createAuditLog({
      adminId: req.user._id,
      action: 'Deleted Skill',
      targetType: 'Skill',
      targetId: skill._id,
      targetName: skill.name,
      details: `Deleted skill "${skill.name}"`,
    });

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

// =========================================
// DELETE REVIEW
// =========================================

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(
      req.params.reviewId
    );

    if (!review) {
      return res.status(404).json({
        err: 'Review not found',
      });
    }

    await Review.findByIdAndDelete(
      req.params.reviewId
    );

    await createAuditLog({
      adminId: req.user._id,
      action: 'Deleted Review',
      targetType: 'Review',
      targetId: review._id,
      targetName: `Review #${review._id}`,
      details: `Deleted review with rating ${review.rating}/5`,
    });

    res.status(200).json({
      message: 'Review deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

// =========================================
// AUDIT LOGS
// =========================================

const getAuditLogs = async (req, res) => {
  try {
    const auditLogs = await AuditLog.find()
      .populate('admin', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      auditLogs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: 'Something went wrong',
    });
  }
};

// =========================================
// EXPORTS
// =========================================

module.exports = {
  dashboard,
  getUsers,
  getSkills,
  getSwaps,
  getReviews,
  getAuditLogs,
  toggleUserStatus,
  deleteUser,
  deleteSkill,
  deleteReview,
};