const mongoose = require("mongoose");

const messengeSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
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
    type: {
        type: String,
        enum: ['file', 'text']
    },
    deleted: {
        type: Enumerator,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const messenge = mongoose.model("message", messsengeSchema);

module.exports = messenge