import mongoose from "mongoose";
import institution from './user.js'
import pilgrim from './user.js'
import User from "./user.js";


let reviewSchema=mongoose.Schema(
    {
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        pilgrimId:{
            type:mongoose.Types.ObjectId,
            ref:pilgrim
        },
        review:{
            type:String
        },
        rating:{
            type:Number
        }
    }
)

let Review=mongoose.model('review', reviewSchema)
export default Review