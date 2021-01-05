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
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    chatBoxs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatBox",
    }],
    messages:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "message"
    }]
});

const account = mongoose.model("account", accountSchema);

module.exports = account;