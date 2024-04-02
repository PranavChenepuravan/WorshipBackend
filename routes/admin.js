import express from 'express'
import User from '../models/user.js'

const router=express()

router.put('/manageUser/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await User.findByIdAndUpdate(id,req.body)
})

router.get('/viewinstprofile/',async (req,res)=>{
    console.log();
    let response=await User.find({userType:"institution"})
    console.log(response);
    res.json(response)
})

router.get('/viewincomeprofile/',async (req,res)=>{
    console.log();
    let response=await User.find({userType:"incometax"})
    console.log(response);
    res.json(response)
})

router.get('/viewarchprofile/',async (req,res)=>{
    console.log();
    let response=await User.find({userType:"archaeology"})
    console.log(response);
    res.json(response)
})

router.get('/viewpilgprofile/',async (req,res)=>{
    console.log();
    let response=await User.find({userType:"pilgrim"})
    console.log(response);
    res.json(response)
})

export default router