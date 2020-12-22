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
        required: true,
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
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
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
const accChatBoxSchema = new mongoose.Schema({
    acc_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: true
    },
    chatBox_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatBox",
        required: true,
    },
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

const account = mongoose.model("account", accountSchema);
const chatBox = mongoose.model("account", chatBoxSchema);
const accChatBox = mongoose.model("account", accChatBoxSchema);
const messenge = mongoose.model("account", messengeSchema);

module.exports = {
    account,
    chatBox,
    accChatBox,
    messenge,
}