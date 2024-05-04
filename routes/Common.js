import express from 'express'
import User from '../models/user.js'
import { upload } from '../multer.js'
import Propertiesinst from '../models/propertiesinst.js'
const router=express()

// router.post('/register',upload.fields([{name:'photo'},{name:'idproof'}]), async (req,res)=>{
//     try{
//         console.log(req.files);
//         if(req.files['photo'][0].filename){

//             req.body={...req.body,photo:req.files['photo'][0].filename}
//         }
//         if(req.files['idproof'][0].filename){

//             req.body={...req.body,idproof:req.files['idproof'][0].filename}
//         }
//         console.log(req.body)
//         let newUser=new User(req.body)
//         console.log(newUser, 'new user');
//         let response=await newUser.save()
//         res.json(response)

//     }
//     catch(e){
//         res.json(e.message)
//     }
// })

router.post('/register', upload.fields([{ name: 'photo' }, { name: 'idproof' }]), async (req, res) => {
    try {
        console.log(req.files);
        
        // Handling single photo upload
        if (req.files['photo']) {
            if (Array.isArray(req.files['photo'])) {
                req.body = { ...req.body, photo: req.files['photo'][0].filename };
            } else {
                req.body = { ...req.body, photo: req.files['photo'].filename };
            }
        }
        
        // Handling single idproof upload
        if (req.files['idproof']) {
            if (Array.isArray(req.files['idproof'])) {
                req.body = { ...req.body, idproof: req.files['idproof'][0].filename };
            } else {
                req.body = { ...req.body, idproof: req.files['idproof'].filename };
            }
        }



        const existMail = await User.findOne({ email: req.body.email });
        if (existMail) {
            return res.status(400).json({ message: 'Mail exists' });
        }
        const existphonenumber = await User.findOne({ phone: req.body.phone });
        if (existphonenumber) {
            return res.status(400).json({ message: 'phone number exists' });
        }
     
        console.log(req.body);
        
        let newUser = new User(req.body);
        console.log(newUser, 'new user');
        let response = await newUser.save();
        res.json(response);
    } catch (e) {
        res.json(e.message);
    }
});


router.post('/login',async (req,res)=>{
    console.log(req.body);
    const{email,password}=req.body
    let user=await User.findOne({email:email,password:password})
    if(!user){
        return res.status(402).json('invalid username or password')
    }
    console.log(user);
    res.json(user)
})


router.post('/authenticate',async(req,res)=>{
    console.log(req.body);
    let response=await User.findOne(req.body)
    console.log(response);
    res.json(response)
})

router.post('/properties', async(req,res)=>{
    console.log(req.body);
    let response=await Propertiesinst.findOne(req.body)
    console.log(response);
    res.json(response)
})

router.delete(`/user/:id`, async(req,res)=>{
    let id=req.params.id
    let response=await User.findByIdAndDelete(id)
    console.log(response)
    res.json(response)
})

// router.delete('/terminate', async (req,res)=>{
//     try{
//         console.log(req.files)
//         req.baseUrl={...req.body}

//         let newUser=new User(req.body)
//         let response=await newUser.save()
//         res.json(response)
//         }
//         catch(e){
//             res.json(e.message)
//         }
// })

router.put('/terminate/:id',async (req,res)=>{
    let id=req.params.id
    let response=await User.findByIdAndUpdate(id,{status:'terminated'})
    console.log(response);
    res.json(response)
})





export default router