import express from 'express'
import User from '../models/user.js'
import { upload } from '../multer.js'
const router=express()

router.post('/register',upload.fields([{name:'photo'}]), async (req,res)=>{
    try{
        console.log(req.files);
        req.body={...req.body,photo:req.files['photo'][0].filename}
        console.log(req.body)
        let newUser=new User(req.body)
        console.log(newUser, 'new user');
        let response=await newUser.save()
        res.json(response)

    }
    catch(e){
        res.json(e.message)
    }
})

router.post('/login',async (req,res)=>{
    console.log(req.body);
    let user=await User.findOne(req.body)
    console.log(user);
    res.json(user)
})



export default router