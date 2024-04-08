import express from 'express'
import Booking from '../models/booking.js';
import User from '../models/user.js';

const router=express()

router.get('/booking/:location',async (req,res)=>{
    let location=req.params.location
    console.log(location);
    let response=await User.find({location:location,userType:'institution'})
    let response1Data=[];
    for(let x of response){
        let booking=await Booking.find({institutionId:x._id})
        response1Data.push({
            institution:x,
            bookings:booking  
        })
    }
    res.json(response1Data);
})

router.put('/booking/:id',async (req,res)=>{
    console.log(req.body)
    // let response=await Booking.find()
    // for(let x of response){
        // let bookingStatus=(req.body.status)
        // console.log(bookingStatus);
        let statusing=await Booking.findByIdAndUpdate(req.params.id,{status:req.body.status})
    // }
})




export default router