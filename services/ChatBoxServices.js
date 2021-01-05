const chatBox  = require("../models/ChatBoxModel");

const createChatBox = (accounts)=>{
   return chatBox.create({accounts:accounts})
}

const findChatBoxID = (ID) =>{
    return chatBox.findOne({_id:ID}).exec();
}
const findAllChatBox = (accountID) =>{
    return chatBox.find(accounts.find(acc=>acc._id == accountID).exec())
}

module.exports = {createChatBox,findChatBoxID,findAllChatBox}