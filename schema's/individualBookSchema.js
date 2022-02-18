const mongoose = require('mongoose')

const indiBookschema = mongoose.Schema({
    bookName: {
        type: String,
        require: true
    },
    bookIdNo: {
        type: Number,
        require: true
    },
    bookGener: {
        type: String,
        require: true
    },
    bookAssignTo: {
        type: Array,
    },
    bookAssignBy: {
        type: String
    }

})

const singleBookSchema = mongoose.model('singleBooks', indiBookschema)

module.exports = singleBookSchema