import express, { response } from 'express'
import Archemployee from '../models/archemployee.js'
import { upload } from '../multer.js';

const router=express()

router.post('/archemployee',upload.single('photo'),async (req,res)=>{
    try{
        console.log(req.file);
        req.body={...req.body,photo:req.file.filename}
        console.log(req.body)
        let newArchemployee=new Archemployee(req.body)
        console.log(newArchemployee, 'new Archemployee');
        let response=await newArchemployee.save()
        res.json(response)
    }
    catch(e){
        res.json(response)
    }
})




export default router