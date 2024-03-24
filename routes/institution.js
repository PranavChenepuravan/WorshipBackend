import express from 'express' 
import Instruction from '../models/instruction.js'
import Preach from '../models/preach.js'
import { upload } from '../multer.js'
import User from '../models/user.js'
import Archaeological from '../models/archaeological.js'
import Donation from '../models/donation.js'
const router=express()

router.post('/instruction',async (req,res)=>{
    try{
        console.log(req.body)
        let newInstruction=new Instruction(req.body)
        console.log(newInstruction, 'new Instruction');
        let response=await newInstruction.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.post('/preach',upload.fields([{name:'photo'}]),async (req,res)=>{
    try{
        console.log(req.files)
        req.body={...req.body,photo:req.files['photo'][0].filename}

        let newPreach=new Preach(req.body)
        console.log(newPreach, 'new Preach');
        let response=await newPreach.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }

})

router.get('/preach/:id',async (req,res)=>{
    let id=req.params.id
    let response=await Preach.find({institutionId:id})
    let responseData=[];
    for (const newresponse of response){
        let institution=await User.findById(newresponse.institutionId);
        responseData.push({
            preach:newresponse,
            institutions:institution
        })
    }
    // console.log(responseData);
    res.json(responseData);
})

router.post('/archaeological',upload.fields([{name:'photo'}]),async (req,res)=>{
    try{
        console.log(req.files)
        req.body={...req.body,photo:req.files['photo'][0].filename}

        let newArchaeological=new Archaeological(req.body)
        console.log(newArchaeological, 'new Archaeological');
        let response=await newArchaeological.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }

})

router.get('/archaeological/:id',async (req,res)=>{
    let id=req.params.id
    let response=await Archaeological.find({institutionId:id})
    let responseData=[];
    for (const newresponse of response){
        let institution=await User.findById(newresponse.institutionId);
        responseData.push({
            archaeological:newresponse,
            institutions:institution
        })
    }
    res.json(responseData);
})

router.post('/donation',upload.fields([{name:'photo'}]),async (req,res)=>{
    try{
        console.log(req.files)
        req.body={...req.body}

        let newDonation=new Donation(req.body)
        console.log(newDonation, 'new Donation')
        let response=await newDonation.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }

})

router.get('/donation/:id',async (req,res)=>{
    let id=req.params.id
    let response=await Donation.find({institutionId:id})
    let responseData=[];
    for (const newresponse of response){
        let institution=await User.findById(newresponse.institutionId);
        responseData.push({
            donation:newresponse,
            institutions:institution
        })
    }
    res.json(responseData);
})

export default router
