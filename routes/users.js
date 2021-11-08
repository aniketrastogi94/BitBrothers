const express=require('express');
const router=express.Router();
const User=require('../models/userModel');
var sha256 = require('js-sha256').sha256;


router.post('/',async(req,res)=>{
    try {
        const {name,username,password}=req.body;
        const us=await User.findOne({username:username});
        if(us){
            return res.status(405).json({
                status:'failure',
                message:'Username already excists',
                data:null
            })
        }
        const use=new User();
        use.name=name;
        use.username=username;
        use.password=sha256(password);
        await use.save();
        return res.status(200).json({
            status:'success',
            message:'User created successfully',
            data:null
        })
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const us=await User.findById(req.params.id);
        if(us){
            return res.status(200).json({
                status:'success',
                message:'User found successfully',
                data:us
            })
        }else{
            return res.status(402).json({
                status:'failure',
                message:'No such user found',
                data:null
            })
        }
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const {name,username}=req.body;
        const us=await User.findById(req.params.id);
        if(us){
            us.name=name;
            us.username=username;
            await us.save();
            return res.status(200).json({
                status:'success',
                message:'User details updated successfully',
                data:null
            })
        }
    } catch (err) {
        return res.status(401).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const us=await User.findById(req.params.id);
        if(us){
            await us.remove();
            return res.status(200).json({
                status:'success',
                message:'User deleted successfully',
                data:null
            })
        }else{
            return res.status(401).json({
                status:'failure',
                message:'No such user found',
                data:null
            })
        }
    } catch (err) {
        return res.status(402).json({
            status:'failure',
            message:err.message,
            data:null
        })
    }
})

module.exports=router;