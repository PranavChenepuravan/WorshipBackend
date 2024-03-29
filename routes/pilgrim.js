import express from 'express'
import Profile from '../models/user.js'
import User from '../models/user.js'
import Booking from '../models/booking.js'
import { upload } from '../multer.js'
import Pilgrimdonation from '../models/pilgrimdonation.js'
import Picture from '../models/Picture.js'
import Review from '../models/review.js'
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

router.get('/booking/:id',async (req,res)=>{
    let id=req.params.pilgrimId

    let response=await Booking.aggregate([
        {
            $lookup:{
                from:"users",
                foreignField:"_id",
                localField:"institutionId",
                as:"usersInfo"
            }
        },
        {
            $unwind: "$usersInfo"
        },

    ])
    res.json(response);
})


router.post('/pilgrimdonation', async (req,res)=>{
    try{
        console.log(req.files)
        req.body={...req.body}

        let newPilgrimdonation=new Pilgrimdonation(req.body)
        let response=await newPilgrimdonation.save()
        res.json(response)
        
    }
    catch(e){
        res.json(e.message)
    }
})


router.get('/pilgrimdonation/:id',async (req,res)=>{
    let id=req.params.pilgrimId

    let response=await Pilgrimdonation.aggregate([
        {
            $lookup:{
                from:"users",
                foreignField:"_id",
                localField:"institutionId",
                as:"usersInfo"
            }
        },
        {
            $unwind: "$usersInfo"
        },

    ])
    res.json(response);
})

router.post('/picture',upload.fields([{name:'photo'}]), async (req,res)=>{
    try{
        console.log(req.files);
        req.body={...req.body,photo:req.files['photo'][0].filename}
        console.log(req.body)
        let newPicture=new Picture(req.body)
        console.log(newPicture, 'new pictre');
        let response=await newPicture.save()
        res.json(response)

    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/picture/',async (req,res)=>{
    let response=await Picture.find()
    console.log(response); 
    let responsedata=[];
    for (const newresponse of response){
    let institution=await User.findById(newresponse.institutionId);
    let pilgrim=await User.findById(newresponse.pilgrimId);
    responsedata.push({
        institutions:institution,
        Picture:newresponse,
        pilgrims:pilgrim
    });
}
    res.json(responsedata)
})

router.get('/viewinst',async (req,res)=>{

    let response=await User.find({userType:'institution'})
    console.log(response);
    res.json(response)
})


router.get('/reviewinst',async (req,res)=>{

    let response=await User.find({userType:'institution'})
    console.log(response);
    res.json(response)
})

router.get('/review/:id',async (req,res)=>{
    let id=req.params.pilgrimId

    let response=await Booking.aggregate([
        {
            $lookup:{
                from:"users",
                foreignField:"_id",
                localField:"institutionId",
                as:"usersInfo"
            }
        },
        {
            $unwind: "$usersInfo"
        },

    ])
    res.json(response);
})

router.post('/review', async (req,res)=>{
    try{
        console.log(req.files)
        req.body={...req.body}

        // let newBooking=new Booking(req.body)
        let newReview=new Review(req.body)
        // let response=await newBooking.save()
        let response=await newReview.save()

        // let institution=await User.findById(newresponse.institutionId);
        let institution=await User.findById(newresponse.institutionId);
        responsedata.push({
            institutions:institution,
            Review:newresponse
        });
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/viewreviewinstitution/:id',async (req,res)=>{
    let id=req.params.id
    console.log(id);
    let response = await User.findById(id).select('-password');
    console.log(response);
    res.json(response)
})
router.get('/viewReviews/:id', async (req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Review.find({institutionId:id})
    console.log(response,'sdff');
    let responseData=[]
    for(let  x of response ){
        console.log(x,'======================');
        let pilgrims=await User.findById(x.pilgrimId)
        console.log(pilgrims,'.....................................');
        responseData.push({
            reviews:x,  
            pilgrim:pilgrims
        })
    }
    
    // let response=await Review.aggregate([
    //     {
    //         $lookup:{
    //             from:"users",
    //             foreignField:"_id",
    //             localField:"institutionId",
    //             as:"usersInfo"
    //         }
    //     },
    //     {
    //         $unwind: "$usersInfo"
    //     },

    // ])
    console.log(responseData,'asddddddddddddd');
    res.json(responseData);
} )


export default router