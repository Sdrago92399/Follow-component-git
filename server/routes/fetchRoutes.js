const express = require('express');
const follower = require('../controllers/fetchFollowerController');
const following = require('../controllers/fetchFollowingController');

const router = express.Router();

router.post('/:id/followers', follower);
router.post('/:id/following', following);

module.exports = router;