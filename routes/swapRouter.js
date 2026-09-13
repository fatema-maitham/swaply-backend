const express = require('express');

const swapCtrl = require('../controllers/swapCtrl');

const router = express.Router();

router.post('/', swapCtrl.createSwap);
router.get('/', swapCtrl.getSwaps);
router.get('/:id', swapCtrl.getSwap);
router.put('/:id', swapCtrl.updateSwap);
router.delete('/:id', swapCtrl.deleteSwap);

module.exports = router;