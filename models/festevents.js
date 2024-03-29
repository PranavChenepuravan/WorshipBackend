import mongoose from "mongoose";
import Festival from "./festival.js";

let festeventsSchema = mongoose.Schema(
    {
        festivalId:{
            type:mongoose.Types.ObjectId,
            ref:Festival
        },
        eventname:{
            type:String
        },
        description:{
            type:String
        },
        date:{
            type:String
        },
        starttime:{
            type:String
        },
        endtime:{
            type:String
        },
        photo:{
            type:String
        }

    }
)

let Festevents=mongoose.model('festevent', festeventsSchema)

export default Festevents
