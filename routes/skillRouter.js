const express = require('express');

const skillCtrl = require('../controllers/skillCtrl');
const skillUpload = require('../middleware/skillUpload');
const isSignedIn = require('../middleware/isSignedIn');

const router = express.Router();

router.post(
  '/',
  isSignedIn,
  skillUpload.single('skillImage'),
  skillCtrl.createSkill
);

router.get('/', skillCtrl.getSkills);

router.get('/:id', skillCtrl.getSkill);

router.put(
  '/:id',
  isSignedIn,
  skillUpload.single('skillImage'),
  skillCtrl.updateSkill
);

router.delete(
  '/:id',
  isSignedIn,
  skillCtrl.deleteSkill
);

module.exports = router;