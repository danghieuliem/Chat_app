const accServices = require('../services/AccServices.js')
const {JWT_SECRET} = require('../config/jwt_secret')
const jwt = require('jsonwebtoken')

const requireAcc  = (req,res,next)=>{
    const token = req.headers['x-token']
    try{
        const encoded = jwt.verify(token,JWT_SECRET)
        accServices.findByID(encoded._id).then((acc)=>{
            req.acc = acc
            next()
        })
    }
    catch(err){
        res.status(400).json({message:"login is required"})
    }
}

module.exports = {requireAcc}