const mongoose = require("mongoose");

const chatBoxSchema = new mongoose.Schema({
    accounts :[{
        type : mongoose.Schema.Types.ObjectId,
        ref:'account'
    }],
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'message'
    }]
});

const chatBox = mongoose.model("chatBox", chatBoxSchema);

module.exports = chatBox