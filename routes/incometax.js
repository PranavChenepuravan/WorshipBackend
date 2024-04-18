import express from 'express'
import Booking from '../models/booking.js';
import User from '../models/user.js';
import Instbookingtax from '../models/Instbookingtax.js';
import Wholedonation from '../models/wholedonation.js';

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

router.put('/insttotalbookingstatus/:id', async (req, res)=>{
    const id = req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Instbookingtax.findByIdAndUpdate(id,req.body)
    console.log(response);
})


router.get('/donation/:location', async (req, res) => {
    try {
        const location = req.params.location;
        console.log(location);

        const institutions = await User.find({ location: location, userType: 'institution' });
console.log(institutions,'][][][][][][');
let responseData=[]
for(let x of institutions){
    let wholedon=await Wholedonation.find({instittutionId:x._id})
    console.log(wholedon,'================================');
    for(let wd of wholedon){

        let inst=await User.findById(wd.instittutionId)
        responseData.push({
            wholedon:wd,
            inst:inst
            
        })
    }
}
        res.json(responseData   )
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/wholedonation/:id', async(req,res)=>{
    let id=req.params.id
    let response=await Wholedonation.find({instittutionId:id})
    console.log(response)
    res.json(response)
})


router.put('wholedonationstatus/:id', async (req,res)=>{
    const id = req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Wholedonation.findByIdAndUpdate(id,req.body)
    console.log(response)
})






export default router