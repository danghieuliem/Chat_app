const mongoose = require("mongoose");

const chatBoxSchema = new mongoose.Schema({
    deleted: {
        type: Boolean,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const chatBox = mongoose.model("chatBox", chatBoxSchema);

module.exports = chatBox