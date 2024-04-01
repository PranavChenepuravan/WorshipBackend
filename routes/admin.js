import express from 'express'
import User from '../models/user.js'

const router=express()

router.get('/viewinstprofile/',async (req,res)=>{
    console.log();
    let response=await User.find({userType:"institution"})
    console.log(response);
    res.json(response)
})

router.put('/manageUser/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await User.findByidAndUpdate(id,req.body)
})


export default router