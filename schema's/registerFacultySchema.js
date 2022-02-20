const mongoose = require('mongoose')

const registerFacultySchema = mongoose.Schema({
    facultyName: {
        type: String,
        require: true
    },

    facultyId: {
        type: Number,
        require: true
    },
    facultyRegistrationNo: {
        type: Number,
        require: true
    },
    facultyPassword: {
        type: String,
        require: true
    },
    facultyPhoneNumber: {
        type: Number,
        require: true
    },
    facultyAge: {
        type: Number,

    },
    facultyAddress: {
        type: String
    }
})

const regFaculty = mongoose.model("Faculty", registerFacultySchema)

module.exports = regFaculty