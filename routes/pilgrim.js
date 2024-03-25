import express from 'express'
import Profile from '../models/user.js'
import User from '../models/user.js'
import Booking from '../models/booking.js'
import { upload } from '../multer.js'
const router=express()

router.get('/viewprofile/:id',async (req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await User.findById(id)
    console.log(response);
    res.json(response)
})

router.put('/editprofile/:id',async (req,res)=>{
    let id=req.params.id
    console.log(req.body,'jhvg');
    let response=await User.findByIdAndUpdate(id,req.body)
    console.log(response);
})

router.post('/booking', async (req,res)=>{
    try{
        console.log(req.files)
        req.body={...req.body}

        let newBooking=new Booking(req.body)
        let response=await newBooking.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/bookinginst',async (req,res)=>{

    let response=await User.find({userType:'institution'})
    console.log(response);
    res.json(response)
})

export default router