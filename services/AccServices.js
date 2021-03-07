const account  = require("../models/AccModel");

const create = ({email,password,name})=>{
   return account.create({email,password,name})
}

const findByEmail = (email) =>{
    return account.findOne({email:email})
}

const findByID = (ID)=>{
    return account.findById(ID)
}

const findAll = () => {
    return account.find({})
}

const addChatBox = ({ID,chatBoxID}) => {
    return account.findByIdAndUpdate(ID,
                                    {$push:{chatBoxs:chatBoxID}},
                                    {new:true, useFindAndModify:false})
}

const addFriend = ({ID,friendID}) => {
    return account.findByIdAndUpdate(ID,
                                    {$push:{friends:friendID}},
                                    {new:true,useFindAndModify:false})
}

module.exports = {create , findByEmail , findByID , findAll,addChatBox,addFriend}