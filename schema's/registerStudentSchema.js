const mongoose = require('mongoose')

const regStudentSchema = mongoose.Schema({
    studentName: {
        type: String,
        require: true
    },
    studentRollNo: {
        type: Number,
        require: true
    },
    studentRegistrationNo: {
        type: Number,
        require: true
    },
    studentClass: {
        type: String,
        require: true
    },
    studentPhoneNumber: {
        type: Number,
        require: true
    },
    studentPassword: {
        type: String,
        require: true

    },
    studentAge: {
        type: Number,

    },
    studentAddress: {
        type: String
    }
})

const regStudent = mongoose.model("Student", regStudentSchema)

module.exports = regStudent