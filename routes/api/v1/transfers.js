const express = require('express');
const router = express.Router();
const transferController = require('../../../controllers/api/v1/transfers');

router.get("/", transferController.getAllByNickname);

router.get("/:id", transferController.getTransferById);

router.post("/", transferController.create);

module.exports = router;