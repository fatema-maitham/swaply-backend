const express = require('express');

const skillCtrl = require('../controllers/skillCtrl');

const router = express.Router();

router.post('/', skillCtrl.createSkill);
router.get('/', skillCtrl.getSkills);

module.exports = router;