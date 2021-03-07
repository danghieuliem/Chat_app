const accServices = require('../services/AccServices')
const {Router} = require('express')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../config/jwt_secret")
const router = Router({ mergeParams: true });
const {requireAcc} = require('../MiddleWares/Auth')
const { underline } = require('chalk')

router.post('/',(req,res)=>{
    const {email,password,name} = req.body
    if(password != undefined ){
        const hashPassword = md5(password)
        accServices.findByEmail(email)
                .then(acc=>{
                    if(acc){
                        res.status(400).json({Message:"Email is existing"})
                        return
                    }
                    return Promise.resolve(true)
                })
                .then(()=>{
                      accServices.create({email,password : hashPassword,name})
                                .then(createdAcc=>res.status(201).json(createdAcc))
                                .catch(err => res.status(500).json(err))
                })
                .catch(err=>res.status(500).json(err))
    }
    else
        return res.status(500).json("password is empty")

})

router
    .get('/authentication',requireAcc,(req,res)=>{
        res.status(200).json(req.acc)
    })
    .post('/authentication',async (req,res)=>{
        const {email,password} = req.body
        hashPassword = md5(password)

        const acc = await accServices.findByEmail(email)

        if(!acc){
            res.status(400).json({Message:"Wrong user"})
        }
        if(acc.password !== hashPassword)
            res.status(400).json({Message:"wrong password"})

        const token = jwt.sign(acc.toJSON(),JWT_SECRET)
        res.send(token)
    })

router.get('/getAll',(req,res)=>{
    accServices.findAll()
                .then(data =>  res.status(200).json(data) )
                .catch(err =>  res.status(400).json({err}) )
})

router.post('/addFriend',(req,res)=>{
    const {ID,friendID} = req.body
    Promise.all([accServices.addFriend({ID,friendID}),accServices.addFriend({friendID:ID,ID:friendID})])
            .then(data =>  res.status(200).json(data) )
            .catch(err =>  res.status(400).json({err}) )
})
module.exports = {router}