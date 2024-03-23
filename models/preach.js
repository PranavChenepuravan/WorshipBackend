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
        date:{
            type:String
        },
        time:{
            type:String
        },
        photo:{
            type:String
        }

        

    }
)

let Preach=mongoose.model('preach', preachSchema)

export default Preach