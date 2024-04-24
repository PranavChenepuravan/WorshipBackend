import express from 'express'
import User from '../models/user.js'
import Bookingtax from '../models/bookingtax.js'
import Booking from '../models/booking.js'
import Instbookingtax from '../models/Instbookingtax.js'
import Wholedonation from '../models/wholedonation.js'

const router=express()

router.put('/manageUser/:id',async(req,res)=>{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await User.findByIdAndUpdate(id,req.body)
})

router.get('/viewinstprofile/',async (req,res)=>{
    console.log();
    let response=await User.find({userType:"institution",        $or: [
        { status: "approved" },
        { status: "blocked" }
    ]})
    console.log(response);
    res.json(response)
})

router.get('/viewnewinstprofile/',async (req,res)=>{
    console.log();
    let response=await User.find({userType:"institution",status:"pending"})
    console.log(response);
    res.json(response)
})





router.get('/viewnewincomeprofile/',async (req,res)=>{
    console.log();
    let response=await User.find({userType:"incometax"})
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
    console.log(response,'==============')
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


router.get('/viewinstprofile/:location', async (req, res) => {
    try {
        const location = req.params.location;
        let response = await User.find({ userType: "institution", location: location,transaction:'pending' });
        console.log(response);
        res.json(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/viewinstprofile2/:location', async (req, res) => {
    try {
        const location = req.params.location;
        let response = await User.find({ userType: "institution", location: location, transaction:'approved'});
        console.log(response);
        res.json(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/viewdonationpilg/:id', async (req,res)=>{
    let id=req.params.id
    let response=await User.find({institutionId:id})
    console.log(response)
    res.json(response)
})



// router.get('/wholedonation', async(req,res)=>{
//     let response=await Wholedonation.find()
//     console.log(response)
//     for (let x of response){
//         User.find({_id:x.instittutionId})

//     }
//     console.log(response,'whole')
//     res.json(response)

// })

router.get('/wholedonation', async(req,res)=>{
    let response=await Wholedonation.find()
    let responseData=[]
    for (let x of response){
        let instInfo=await User.findById(x.instittutionId)
       responseData.push({
        donations:x,
        instInfo:instInfo
       })
    }
    console.log(responseData,'whole')
    res.json(responseData)
})

// router.put('/wholedonationtax', async (req,res)=>{
//     console.log(req.body)
//     let response=await Wholedonation.find()
//     for(let x of response){
//         let currentPercentage=(req.body.tax)
//         let taxAmount=(req.body.tax/100)*x.totalSum
//         console.log(taxAmount);
//         let taxing=await Wholedonation.findByIdAndUpdate(x._id,{tax:taxAmount,currentPercentage:currentPercentage})
//         console.log(taxing);
//     }
    
// })

router.put('/wholedonationtax', async (req, res) => {
    console.log(req.body);

    try {
        // Retrieve all donations
        let donations = await Wholedonation.find();

        // Iterate through each donation
        for (let donation of donations) {
            // Check if the donation already has tax
            if (!donation.tax) {
                // Calculate tax amount
                let taxAmount = (req.body.tax / 100) * donation.totalSum;

                // Update donation with tax information
                let updatedDonation = await Wholedonation.findByIdAndUpdate(
                    donation._id,
                    {
                        tax: taxAmount,
                        currentPercentage: req.body.tax,
                        balance: taxAmount,
                    },
                    { new: true } // To return the updated document
                );

                console.log("Updated Donation:", updatedDonation);
            }
        }

        res.status(200).json({ message: "Tax updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/institutionsdonationtax/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id,'saddasddsadsdasdasdasd');

    try {
        const donationtax = await Wholedonation.findById(id);
        if (!donationtax) {
            return res.status(404).json({ message: "Booking tax not found" });
        }
console.log(req.body);
        const { totaltaxes, payed } = req.body;
        // payed=parseFloat(payed)
        let data=await Wholedonation.findById(id)
        const balance = data.balance - payed;
        console.log(balance,'dssd');
        
        const updatedWholedonation = await Wholedonation.findByIdAndUpdate(id, { ...req.body, balance }, { new: true });

        return res.status(200).json(updatedWholedonation);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.get('/institutionsdonationtax/:id', async(req,res)=>{
    let id=req.params.id
    console.log(id, 'id pass')
    let response=await Wholedonation.find({instittutionId:id})
    console.log(response)
    res.json(response)
})




export default router