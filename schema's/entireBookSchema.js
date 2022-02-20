const mongoose = require('mongoose')

const overallBook = mongoose.Schema({

    bookName: {
        type: String,
        require: true
    },
    bookImage: {
        type: String,
        require: true
    },
    bookWritrName: {
        type: String,
        require: true
    },
    bookGener: {
        type: String,
        require: true
    },
    bookQuantity: {
        type: Number,

    },
    bookAddDate: {
        type: String,
        require: true
    }
})
const entireBookSchema = mongoose.model('booksType', overallBook)
module.exports = entireBookSchema