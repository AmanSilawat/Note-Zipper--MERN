const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { get_note, create_note, get_note_by_id, update_note, delete_note } = require('./../controllers/noteController');

const router = express.Router();


router
    .route('/')
    .get(protect, get_note);

router
    .route('/create')
    .post(protect, create_note)

router
    .route('/:id')
    .get(get_note_by_id)
    .put(protect, update_note)
    .delete(protect, delete_note)

module.exports = router;