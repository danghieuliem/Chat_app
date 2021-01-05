const account  = require("../models/AccModel");

const createAccount = ({email,password,name})=>{
   return account.create({email,password,name})
}

const findAccByEmail = (email) =>{
    return account.findOne({email:email}).exec();
}

const findAccByID = (ID)=>{
    return account.findById(ID)
}

module.exports = {createAccount , findAccByEmail , findAccByID}