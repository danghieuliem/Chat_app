const mongoose = require("mongoose");

const chatBoxSchema = new mongoose.Schema({
    deleted: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    accounts = [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "account"
    }],
    messages = [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'message'
    }]
});

const chatBox = mongoose.model("chatBox", chatBoxSchema);

module.exports = chatBox