const messageServices = require('../services/MessageServices')
const {Router} = require('express')
const {requireAcc} = require('../MiddleWares/Auth')
const router = Router({mergeParams:true})

router.post('/',requireAcc,(req,res) => {
        const {content , type , acc_ID , chatBox_ID} = req.body
        messageServices.create({content , type , acc_ID , chatBox_ID})
                        .then(message => res.status(200).json(message))
                        .catch(err => res.status(500).json(err))
    })
    .get('/',requireAcc,(req,res) =>{
        const {chatBox_ID} = req.body
        messageServices.findAllByCBID({chatBox_ID})
                        .then(messages => res.status(200).json(messages))
                        .catch(err => res.status(500).json(err))
    })
module.exports = {router}