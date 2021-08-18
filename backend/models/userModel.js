const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const user_schema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        isAdmin: {
            // 
            type: Boolean,
            require: true,
            default: false,
        },
        pic: {
            type: String,
            require: true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        }
    },
    {
        timestamp: true
    }
);

user_schema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

user_schema.methods.matchPassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

const User = mongoose.model('User', user_schema);

module.exports = User;