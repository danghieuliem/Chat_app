const chatGroup = require('../models/ChatGroupModel')

const create = ({chatBoxID,name,avatar}) => {
    return chatGroup.create({chatBox:chatBoxID,name,avatar})
}

const findByID = (ID) => {
    return chatGroup.findByID(ID)
}

const findAll = () => {
    return chatGroup.find({})
}

const findByCBID = (ID) => {
    return chatGroup.findOne({chatBox:ID})
}
module.exports = {create,findByID,findAll,findByCBID}