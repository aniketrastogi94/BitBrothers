const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        default:""
    }
})

const User=mongoose.model('user',UserSchema);
module.exports=User;