const chatBox  = require("../models/ChatBoxModel")
const accServices = require('./AccServices')
const chatGroupServices = require('./ChatGroupServices')

const create = ()=>{
   return chatBox.create({})
}

const findByID = (ID) =>{
    return chatBox.findById(ID)
}

const findAll = () => {
    return chatBox.find({})
}

const find_CB_With_Name = async (chatBoxID,accountID) =>{
   const _chatBox = await chatBox.findById(chatBoxID)
                                 .select("-messages -__v")
   const accounts = _chatBox["accounts"]
   if(accounts.length == 2){
        const partnerID =  accounts[0] == accountID ? 
        accounts[1] : accounts[0]
        const partner = await accServices.findByID(partnerID)
        return {_chatBoxID:_chatBox._id,name : partner["name"], avatar:partner["avatar"],_isChatGroup:false }
   }
   else{
        const {name,avatar} = await chatGroupServices.findByCBID(String(_chatBox._id))
        return {_chatBoxID:_chatBox._id,name,avatar,_isChatGroup : true}
    }
   
}

const addAccounts = ({id,value}) =>{
    return chatBox.findByIdAndUpdate(id,
                                    {$push : {accounts:value}},
                                    {new: true , useFindAndModify:false})
}

module.exports = {create,findByID,findAll,find_CB_With_Name,addAccounts}