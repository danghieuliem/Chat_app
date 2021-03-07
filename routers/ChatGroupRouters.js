const chatGroupServices = require('../services/ChatGroupServices')
const {createChatBox} = require('./ChatBoxRouters')
const {Router} = require('express')
const { requireAcc } = require('../MiddleWares/Auth')
const chatGroup = require('../models/ChatGroupModel')
const router = Router({mergeParams:true})

router.post('/',createChatBox,(req,res)=>{
        const {name,avatar} = req.body
        const chatBoxID = req.chatBoxID
        chatGroupServices.create({chatBoxID,name,avatar})
                        .then(chatGroup => res.status(200).json(chatGroup))
                        .catch(err => res.status(500).json({message:"have something wrong"}))
    })
    .get('/',requireAcc,(req,res)=>{
        const {_id} = req.body
        chatGroupServices.findByID(_id)
                        .then(chatGroup => res.status(200).json(chatGroup))
                        .catch(err => res.status(500).json({message:"have something wrong"}))

    })
module.exports = {router}
