import mongoose from "mongoose";
import institution from './user.js'
let festivalSchema = mongoose.Schema(
    {
        photo:{
            type:String
        },
        festivalname:{
            type:String
        },
        about:{
            type:String
        },
        startingdate:{
            type:String
        },
        endingdate:{
            type:String
        },
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:institution 
        }

    }
)
let Festival=mongoose.model('festival', festivalSchema)

export default Festival