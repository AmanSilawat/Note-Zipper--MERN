const express = require('express');
const notes = require('./data/note');
const path = require('path');
const dotenv = require('dotenv');
const connect_db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connect_db();
app.use(express.json())

const PORT = process.env.PORT || 3002;


app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

// deployment
__dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('api is running')
    })
}
// deployment


app.use(notFound)
app.use(errorHandler)


app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`))
