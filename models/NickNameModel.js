const mongoose = require('mongoose')

const nickNameSchema = new mongoose.Schema({
    nickName :{
        type:String,
        require:true
    },
    account :{
        type : mongoose.Schema.Types.ObjectId,
        ref :'account'
    },
    chatBox : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'chatBox'
    }
})