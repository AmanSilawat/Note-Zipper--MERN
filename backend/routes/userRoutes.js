const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
const { registerUser, authUser, updateUserProfile} = require('./../controllers/userControllers')


router
    .route('/')
    .post(registerUser)

router
    .route('/login')
    .post(authUser)

router
    .route('/profile')
    .post(protect, updateUserProfile)

module.exports = router;