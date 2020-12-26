const accServices = require('../services/AccServices')
const {Router} = require('express')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../config/jwt_secret")
const router = Router({ mergeParams: true });
const {requireAcc} = require('../MiddleWares/Auth')

router.post('/',(req,res)=>{
    const {email,password,name,avatar,token,tokenNext} = req.body
    const hashPassword = md5(password)
    
    accServices.findAccByEmail(email)
                .then(acc=>{
                    if(acc){
                        res.status(400).json({Message:"Email is existing"})
                        return
                    }
                    return Promise.resolve(true)
                })
                .then(()=>{
                    return accServices.createAccount({email,password : hashPassword,name,avatar,token,tokenNext})
                                .then(createdAcc=>res.status(201).json(createdAcc))
                })
                .catch(err=>res.status(500).json(err))
})

router
    .get('/authentication',requireAcc,(req,res)=>{
        res.json(req.acc)
    })
    .post('/authentication',async (req,res)=>{
        const {email,password} = req.body
        hashPassword = md5(password)

        const acc = await accServices.findAccByEmail(email)

        if(!acc){
            res.status(400).json({Message:"Wrong user"})
        }

        const token = jwt.sign(acc.toJSON(),JWT_SECRET)

        res.send(token)
    })
module.exports = router