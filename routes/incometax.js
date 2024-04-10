import express from 'express'
import Booking from '../models/booking.js';
import User from '../models/user.js';
import Instbookingtax from '../models/Instbookingtax.js';

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

router.get('/viewinstprofile/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let response = await User.findById(id);
        console.log(response);
        let location = response.location;
        console.log(location);
        
        // Find institutions based on location and userType
        let institutions = await User.find({ location: location, userType: 'institution' });

        let response1Data = [];
        for (let institution of institutions) {
            // Find instbookingtaxs based on institutionId
            let instbookingtaxs = await Instbookingtax.find({ institutionId: institution._id });
            
            response1Data.push({
                institution: institution,
                instbookingtaxs: instbookingtaxs
            });
        }
        res.json(response1Data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/updatetbookingtotal/:id', async (req, res) => {
    try {
        console.log(req.body);
        const { status } = req.body;
        
        // Update the status of the Instbookingtax document with the provided ID
        const updatedInstbookingtax = await Instbookingtax.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true } // To return the updated document
        );

        if (!updatedInstbookingtax) {
            return res.status(404).json({ error: 'Instbookingtax not found' });
        }

        console.log("Updated Instbookingtax:", updatedInstbookingtax);
        res.json(updatedInstbookingtax);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






export default router