const express = require('express');
const notes = require('./data/note')
const dotenv = require('dotenv');
const connect_db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connect_db();
app.use(express.json())

// cors
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });


const PORT = process.env.PORT || 5000; 
 

app.get('/', (req, res) => {
    res.send('api is running')
})

console.log('data');
app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`))
