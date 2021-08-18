const express = require('express');
const notes = require('./data/note')
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000; 
 

app.get('/', (req, res) => {
    res.send('api is running')
})
console.log('data');
app.get('/api/note', (req, res) => {
    console.log('data');
    res.send(notes);
});

app.get('/api/note/:id', (req, res) => {
    console.log(notes[0]._id, req.params.id)
    const note = notes.find((n) => n._id === req.params.id)
    res.send(note);
});

app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`))
