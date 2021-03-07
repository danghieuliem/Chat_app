const mongoose = require('mongoose')

const chatGroupSchema = new mongoose.Schema({
    chatBox:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chatbox'
    },
    name :{
        type:String,
        require:true,
    },
    avatar:{
        type:String,
        default:"path"
    }
})

const chatGroup = mongoose.model("chatGroup",chatGroupSchema)

module.exports = chatGroup