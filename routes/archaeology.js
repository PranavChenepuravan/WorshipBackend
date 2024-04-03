import express, { response } from 'express'
import Archemployee from '../models/archemployee.js'
import Archheritage from '../models/archheritage.js';
import { upload } from '../multer.js';
import User from '../models/user.js';

const router=express()

router.post('/archemployee',upload.single('photo'),async (req,res)=>{
    try{
        console.log(req.file);
        req.body={...req.body,photo:req.file.filename}
        console.log(req.body)
        let newArchemployee=new Archemployee(req.body)
        console.log(newArchemployee, 'new Archemployee');
        let response=await newArchemployee.save()
        res.json(response)
    }
    catch(e){
        res.json(response)
    }
})


router.get('/archheritage/:id',async (req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await User.findById(id)
    console.log(response.location);
    let heritage=await Archheritage.find({location:response.location})
    res.json(heritage)
})

router.put('/manageHeritage/:id',async(req,res)=>{
    let id = req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Archheritage.findByIdAndUpdate(id,req.body,{new:true})
    console.log(response);
})




export default router