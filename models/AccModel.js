const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    tokenNext: {
        type: String,
        required: true,
        unique: true
    },
    deleted: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const account = mongoose.model("account", accountSchema);

module.exports = account;