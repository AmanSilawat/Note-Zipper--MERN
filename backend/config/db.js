const mongoose = require('mongoose');

const connect_db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log(`MongoDb connected: ${conn.connection.host}`); 
    } catch (error) {
        console.log(error)
    }
}

module.exports = connect_db;