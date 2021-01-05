const chatBoxServices = require('../services/ChatBoxServices')
const Router = require('express')
const router = Router({mergeParams:true})
const {requireAcc} = require('MiddleWares/Auth')

router.post('/',(req,res)=>{
    chatBoxServices.createChatBox(req.accounts)
                    .then(chatBox => res.status(201).json(chatBox))
                    .catch(err=>res.status(500).json({message:err}))
})
    .get('/all',requireAcc,(req,res)=>{
        chatBoxServices.findAllChatBox(req.account._id)
                        .then(chatBoxs => res.status(201).json(chatBoxs))
                        .catch(err=>res.status(500).json({message:err}))
    })
    .get('/',requireAcc,(req,res)=>{
        chatBoxServices.findChatBoxID(req.account._id)
                        .then(chatBox => res.status(201).json(chatBox))
                        .catch(err=>res.status(500).json({message:err}))
    })
module.exports = {router}