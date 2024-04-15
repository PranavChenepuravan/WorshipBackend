import express from 'express'
import User from '../models/user.js'
import { upload } from '../multer.js'
import Propertiesinst from '../models/propertiesinst.js'
const router=express()

router.post('/register',upload.fields([{name:'photo'},{name:'idproof'}]), async (req,res)=>{
    try{
        console.log(req.files);
        if(req.files['photo'][0].filename){

            req.body={...req.body,photo:req.files['photo'][0].filename}
        }
        if(req.files['idproof'][0].filename){

            req.body={...req.body,idproof:req.files['idproof'][0].filename}
        }
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
    const{email,password}=req.body
    let user=await User.findOne({email:email,password:password})
    console.log(user);
    res.json(user)
})


router.post('api/auth/authenticate',async(req,res)=>{
    console.log(req.body);
    let response=await User.findOne(req.body)
    console.log(response);
    res.json(response)
})

router.post('/properties', async(req,res)=>{
    console.log(req.body);
    let response=await Propertiesinst.findOne(req.body)
    console.log(response);
    res.json(response)
})






export default router