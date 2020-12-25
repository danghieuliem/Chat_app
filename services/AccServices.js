const account  = require("../models/AccModel");

const createAccount = ({email,password,name,avatar,token,tokenNext})=>{
   return account.create({email,password,name,avatar,token,tokenNext})
}

const findAccByEmail = (email) =>{
    return account.findone({email:email}).exec();
}

const findAccByID = (ID)=>{
    return account.findById(ID)
}

module.exports = {createAccount , findAccByEmail , findAccByID}