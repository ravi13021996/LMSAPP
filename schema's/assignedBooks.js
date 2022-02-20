const mongoose = require('mongoose')

const indiBookschema = mongoose.Schema({
    bookName: {
        type: String,
        require: true
    },
    bookIdNo: {
        type: String,
        require: true
    },
    bookGener: {
        type: String,
        require: true
    },
    bookAssignTo: {
            name:{
            type:String,
            require:true
             },

             regId:{
             type:Number,
            require:true
             }
        
    },
    bookAssignBy: {
        name:{
            type:String,
            require:true
             },

             id:{
             type:Number,
            require:true
             }
    },
    bookAssignDate:{
        type:String,
        require:true
    }

})

const singleBookSchema = mongoose.model('assignedBook', indiBookschema)

module.exports = singleBookSchema