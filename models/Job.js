const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide company'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'please provide position'],
        maxlength:100

    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:
    {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide User']
    }

},{timestamps:true})


module.exports=mongoose.model('Job',jobSchema);