const Note = require('./../models/noteModel');
const async_handler = require('express-async-handler');

const get_note = async_handler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    console.log(notes);
    res.json(notes);
});

const create_note = async_handler(async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error('Please Fill all the Fields');
    } else {
        const note = new Note({ user: req.user._id, title, content, category });

        const createdNote = await note.save();

        res.status(201).json(createdNote);
    }
})

const get_note_by_id = async_handler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: "Note not found" });
    }
});

const update_note = async_handler(async (req, res) => {
    const { title, content, category } = req.body;

    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (note) {
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404);
        throw new Error("Note not found");
    }
});

const delete_note = async_handler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (note) {
        await note.remove();
        res.json({ message: "Note Removed" });
    } else {
        res.status(404);
        throw new Error("Note not Found");
    }
});

module.exports = { get_note, create_note, get_note_by_id, update_note, delete_note}