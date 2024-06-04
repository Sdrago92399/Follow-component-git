const express = require('express');
const follow = require('../controllers/followController');
const unfollow = require('../controllers/unfollowController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/follow/:id', verifyToken, follow);
router.post('/unfollow/:id', verifyToken, unfollow);

module.exports = router;