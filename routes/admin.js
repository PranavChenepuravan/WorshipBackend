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
        let newInstbookingtax=new Instbookingtax({...req.body,balance:req.body.totaltax})
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

// router.put('/institutionsbookingtax/:id', async(req,res)=>{
//     let id=req.params.id
//     console.log(id);
//     let response=await Instbookingtax.findByIdAndUpdate(id,req.body)
//     console.log(response);
// })


router.put('/institutionsbookingtax/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id,'saddasddsadsdasdasdasd');

    try {
        const bookingTax = await Instbookingtax.findById(id);
        if (!bookingTax) {
            return res.status(404).json({ message: "Booking tax not found" });
        }
console.log(req.body);
        const { totaltax, payed } = req.body;
        // payed=parseFloat(payed)
        let data=await Instbookingtax.findById(id)
        const balance = data.balance - payed;
        console.log(balance,'dssd');
        
        const updatedBookingTax = await Instbookingtax.findByIdAndUpdate(id, { ...req.body, balance }, { new: true });

        return res.status(200).json(updatedBookingTax);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});






export default router