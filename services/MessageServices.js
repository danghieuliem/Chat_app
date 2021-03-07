const message = require('../models/MessageModel')

const create = ({content , type , chatBox_ID , acc_ID}) =>{
    return message.create({content , type , chatBox_ID , acc_ID})
}

const findByID = (ID) => {
    return message.findById(ID)
}

const find = ({acc_ID , chatBox_ID}) => {
    return message.findOne({acc_ID,chatBox_ID})
}

const findAll = () => {
    return message.find({})
}

const findAllByCBID = ({chatBox_ID}) => {
    return message.find({chatBox_ID})
}

module.exports = {create, findByID , find,findAll, findAllByCBID}