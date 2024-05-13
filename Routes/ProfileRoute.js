
const express = require('express');
const router = express.Router();
const { profileController,getUserJobs } = require('../Controllers/ProfileControllers');

// Define route for profile page
router.get('/', profileController);
router.get('/user',getUserJobs)


module.exports = router;
