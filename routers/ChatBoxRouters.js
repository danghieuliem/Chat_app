const chatBoxServices = require('../services/ChatBoxServices')
const accServices = require('../services/AccServices')
const Router = require('express')
const router = Router({mergeParams:true})
const {requireAcc} = require('../MiddleWares/Auth')
const  mongoose  = require('mongoose')

const createChatBox = (req,res,next) =>{
    const {members} = req.body
    chatBoxServices.create()
                   .then(chatBox => {
                        let arrMem = [] 
                        let arrPromise= []
                        members.forEach(member => {
                            arrMem.push(mongoose.Types.ObjectId(member))
                            arrPromise.push(accServices.addChatBox({id:member,value:chatBox._id}))   
                        })
                        arrPromise.push(chatBoxServices.addAccounts({id:chatBox._id,value:arrMem}))
                        Promise.all(arrPromise)
                                .then(data =>{
                                    if(next != undefined){
                                        req.chatBoxID = chatBox._id
                                        next()
                                    }
                                    else
                                        res.status(201).json(data)
                                })
                                .catch(err=>{console.log(err)})

                    })
                    .catch(err=>res.status(500).json(err))
}
router.post('/',requireAcc,createChatBox)
      .get('/',requireAcc,(req,res)=>{
            const account =  req.acc
            const accountID = String(account._id)
            var promises = []
             account["chatBoxs"].forEach(chatBoxID =>{
                 promises.push(chatBoxServices.find_CB_With_Name(String(chatBoxID),accountID))
             })
             Promise.all(promises)
                    .then(data => res.status(200).json(data))
                    .catch(err => res.status(500).json(err))
      })
      

module.exports = {router,createChatBox}