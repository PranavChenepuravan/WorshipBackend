import mongoose from "mongoose";
import institution from './user.js'

let preachSchema=mongoose.Schema(
    {
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:institution
        },
        classId:{
            type:String
        },
        preacher:{
            type:String
        },
        topic:{
            type:String
        },
        other:{
            type:String
        },
        startingdate:{
            type:String
        },
        endingdate:{
            type:String
        },
        time:{
            type:String
        },
        photo:{
            type:String
        },
        days:{
            type:Number
        }

        

    }
)

let Preach=mongoose.model('preach', preachSchema)

export default Preach