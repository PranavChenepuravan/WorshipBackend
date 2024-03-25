import mongoose from "mongoose";
import User from "./user";

let bookingSchema=mongoose.Schema(
    {
       institutionId:{
        type:mongoose.Types.ObjectId,
        ref:User
       },
       institutionName:{
        type:String
       },
       location:{
        type:String
       },
       phone:{
        type:String
       },
       email:{
        type:String
       },
       other:{
        type:String
       },
       paymentstatus:{
        type:String
       }
    }
)
let Bookinginst=mongoose.model('donation', bookingSchema)
export default Bookinginst