const express = require('express');
const {handleGetAnalytics} = require("../controllers/url");
const router = express.Router();

const {handleGenerateNewShortURL} = require("../controllers/url");

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;