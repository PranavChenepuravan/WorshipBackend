import express from 'express'
import User from '../models/user.js'
import Bookingtax from '../models/bookingtax.js'
import Booking from '../models/booking.js'
import Instbookingtax from '../models/Instbookingtax.js'

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


router.post('/bookingtax', async (req,res)=>{
    try{
        console.log(req.body)
        let newBookingtax=new Bookingtax(req.body)
        console.log(newBookingtax, 'new Bookingtax');
        let response=await newBookingtax.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

// router.get('/booking', async (req,res)=>{
//     let response=await Booking.find()
//     console.log(response);
//     let responsedata=[];
//     for (const newresponse of response){
//         let institution=await User.findById(newresponse.institutionId);
//         let pilgrim=await User.findById(newresponse.pilgrimId);
//         responsedata.push({
//             institutions:institution,
//             Booking:newresponse,
//             pilrims:pilgrim 
//         });
//     }

// })

router.put('/bookingtax', async (req,res)=>{
    console.log(req.body)
    let response=await Booking.find()
    for (let x of response){
        let currentPercentage=(req.body.tax)
        let taxAmount=(req.body.tax/100)*x.amount  
        console.log(taxAmount);
        let taxing=await Booking.findByIdAndUpdate(x._id,{tax:taxAmount,currentPercentage:currentPercentage})
    }
    
})

router.get('/booking', async(req,res)=>{
    let response=await Booking.aggregate([
        {
            $lookup:{
                from:"users",
                foreignField:"_id",
                localField:"institutionId",
                as:"institutionInfo"
            }
        }
    ])
    res.json(response)
})



router.get('/bookingtax', async (req,res)=>{
    let response=await Bookingtax.find()
    console.log(response);
    res.json(response)
})


router.get('/bookingtaxinst/:id', async(req,res)=>{
    let id=req.params.id
    let response=await Booking.find({institutionId:id})
    console.log(response)
    res.json(response)
})


router.post('/institionsbookingtax', async (req,res)=>{
    try{
        console.log(req.body)
        let newInstbookingtax=new Instbookingtax(req.body)
        console.log(newInstbookingtax, 'new Instbookingtax');
        let response=await newInstbookingtax.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }

})


router.get('/institionsbookingtax/:id', async(req,res)=>{
    let id=req.params.id
    console.log(id,'id passed')
    let response=await Instbookingtax.find({institutionId:id})
    console.log(response)
    res.json(response)
})



export default router