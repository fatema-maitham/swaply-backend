const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Programming & Technology',
        'Design & Creative',
        'Languages',
        'Business & Career',
        'Education & Tutoring',
        'Music',
        'Cooking & Food',
        'Sports & Fitness',
        'Arts & Crafts',
        'Lifestyle',
        'Outdoor & Adventure',
        'Other',
      ],
    },
    skillImage: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;