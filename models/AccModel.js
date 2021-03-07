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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    chatBoxs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatBox",
    }],
    friends :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account"
    }]
});

const account = mongoose.model("account", accountSchema);

module.exports = account;