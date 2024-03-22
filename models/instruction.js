import mongoose from "mongoose";
import institution from './user.js'

let instrSchema=mongoose.Schema(
    {
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:institution
        },

        instruction:{
            type:String
        }
    }
)
let Instruction=mongoose.model('instruction', instrSchema)

export default Instruction