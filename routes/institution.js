import express from 'express' 
import Instruction from '../models/instruction.js'
import Preach from '../models/preach.js'
import { upload } from '../multer.js'
import User from '../models/user.js'
import Archaeological from '../models/archaeological.js'
import Donation from '../models/donation.js'
import Festival from '../models/festival.js'
import Festevents from '../models/festevents.js'
import Picture from '../models/Picture.js'
import Review from '../models/review.js'
import Booking from '../models/booking.js'
import Archheritage from '../models/archheritage.js'
import Instbookingtax from '../models/Instbookingtax.js'
import Pilgrimdonation from '../models/pilgrimdonation.js'
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


router.post('/festival',upload.fields([{name:'photo'}]),async (req,res)=>{
    try{
        console.log(req.files)
        req.body={...req.body,photo:req.files['photo'][0].filename}

        let newFestival=new Festival(req.body)
        console.log(newFestival, 'new Festival');
        let response=await newFestival.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/festival/:id', async (req,res)=>{
    let id=req.params.id
    let response=await Festival.find({institutionId:id})
    let responseData=[];
    for (const newresponse of response){
        let institution=await User.findById(newresponse.institutionId);
        responseData.push({
            festival:newresponse,
            institutions:institution
        })
    }
    res.json(responseData);
})

router.post('/festevents',upload.fields([{name:'photo'}]),async (req,res)=>{
    try{
        console.log(req.files)
        req.body={...req.body,photo:req.files['photo'][0].filename}

        let newFestevents = new Festevents(req.body)
        console.log(newFestevents, 'new Festevents');
        let response=await newFestevents.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})

router.get('/festevents/:id', async (req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Festevents.find({festivalId:id})
    console.log(response);
    res.json(response)
})

router.get('viewfestforevent/:id',async (req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Festival.findById(id)
    console.log(response);
    res.json(response)
})

router.get('/picture/:id',async (req,res)=>{
    let id=req.params.id
    let response=await Picture.find({institutionId:id})
    console.log(response); 
    let responsedata=[];
    for (const newresponse of response){

        let pilgrims=await User.findById(newresponse.pilgrimId)
        responsedata.push({
            photos:newresponse,
            pilgrims:pilgrims
        })
}
    res.json(responsedata)
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
    
    console.log(responseData,'asddddddddddddd');
    res.json(responseData);
} )

router.get('/visitingBooking/:id',async(req,res)=>{
    let id=req.params.id
    let bookings=await Booking.find({institutionId:id})
    let responseData=[]
    for(let x of bookings){
        let pilgrims=await User.findById(x.pilgrimId)
        console.log(pilgrims);
        responseData.push({
            bookings:x,
            pilgrims:pilgrims
        })
    }
    res.json(responseData)

})


router.post('/archheritage',upload.fields([{name:'photo'}]),async (req,res)=>{
    try{
        console.log(req.files)
        req.body={...req.body,photo:req.files['photo'][0].filename}

        let newArchheritage=new Archheritage(req.body)
        console.log(newArchheritage, 'new Archheritage');
        let response=await newArchheritage.save()
        res.json(response)
    }
    catch(e){
        res.json(e.message)
    }

})

router.get('/archheritage/:id',async (req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Archheritage.find({institutionId:id})
    console.log(response);
    res.json(response)
})

router.get('/instruction/:id',async (req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Instruction.find({institutionId:id})
    console.log(response);
    res.json(response)
})

router.get('/instructionedit/:id',async (req,res)=>{
    let id=req.params.id
    console.log(id);
    let response=await Instruction.findById(id)
    console.log(response);
    res.json(response)
})

router.put('/instructionedit/:id', async(req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Instruction.findByIdAndUpdate(id,req.body,{new:true})
    console.log(response);
    res.json(response)
})

router.delete(`/instructiondelete/:id`,async(req,res)=>{
    let id=req.params.id
    let response=await Instruction.findByIdAndDelete(id)
    console.log(response)
})

router.get('/booking/:id', async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let response = await Booking.find({ institutionId: id }); // Use variable id instead of string 'id'
    console.log(response);
    res.json(response);
});

router.put('/institionsbookingtax/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id,']]]]]]]]]]]]]]]]');
    console.log(req.body)
    let response=await Instbookingtax.findByIdAndUpdate(id,req.body)
    console.log(response);
    res.json(response)
})



router.get('/pilgdonation/:id', async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let response = await Pilgrimdonation.find({ institutionId: id });
    console.log(response,'response1');
    res.json(response); // Corrected from response.json() to res.json()
});


  



export default router
