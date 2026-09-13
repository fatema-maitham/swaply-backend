const express = require('express');
const skillCtrl = require('../controllers/skillCtrl');
const skillUpload = require('../middleware/skillUpload');

const router = express.Router();

router.post(
  '/',
  skillUpload.single('skillImage'),
  skillCtrl.createSkill
);

router.get('/', skillCtrl.getSkills);

router.get('/:id', skillCtrl.getSkill);

router.put(
  '/:id',
  skillUpload.single('skillImage'),
  skillCtrl.updateSkill
);

router.delete('/:id', skillCtrl.deleteSkill);

module.exports = router;