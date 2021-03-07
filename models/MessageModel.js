const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['file', 'text']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    chatBox_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatBox",
        required: true,
    },
    acc_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: true
    },
});

const message = mongoose.model("message", messageSchema);

module.exports = message