const express = require('express');
const router = express.Router();
const leaderboardController = require('../../../controllers/api/v1/leaderboard');

router.get("/", leaderboardController.getCoinsFromUsers);

module.exports = router;