const express = require('express')
const mongoose = require('mongoose')

const regStudent = require("./schema's/registerStudentSchema")
const regFaculty = require("./schema's/registerFacultySchema")
require('dotenv').config()
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000;

mongoose.connect(`mongodb+srv://ravilms:ravi%402020@cluster0.v1isd.mongodb.net/LMSDATA?retryWrites=true&w=majority`).then(() => console.log("database Connected")).catch((err) => console.log(err, "connection error"))
app.use(bodyParser.json());


app.post("/loginStudent", async(req, res) => {
    console.log(req.body)
    const { regNo, password } = req.body;

    if (regNo != undefined & password != undefined) {
        const studentSearch = await regStudent.find({ studentRegistrationNo: regNo, studentPassword: password })
        console.log(studentSearch)
        if (studentSearch.length == 0) {
            res.send("Either registration Number or password is wrong")

        } else {
            res.send("login successful")
        }
    } else {
        res.send("please fill all feild")
    }
})



app.post("/loginFaculty", async(req, res) => {

    console.log(req.body)
    const { regNo, password } = req.body;

    if (regNo != undefined & password != undefined) {
        const facultySearch = await regFaculty.find({ facultyRegistrationNo: regNo, facultyPassword: password })
        console.log(facultySearch)
        if (facultySearch.length == 0) {
            res.send("Either registration Number or password is wrong")

        } else {
            res.send("login successful")
        }
    } else {
        res.send("please fill all feild")
    }
})



app.post("/registerFaculty", async(req, res) => {

    const { name, id, regNo, password, phonenumber, age, address } = req.body

    if (name != undefined & id != undefined & regNo != undefined & password != undefined & phonenumber != undefined & age != undefined & address != undefined) {
        const facultySearchResponse = await regFaculty.find({ facultyRegistrationNo: regNo })
        if (facultySearchResponse.length == []) {
            const faculty = new regFaculty({ facultyName: name, facultyId: id, facultyRegistrationNo: regNo, facultyPassword: password, facultyPhoneNumber: phonenumber, facultyAge: age, facultyAddress: address })
            faculty.save()
            res.send("faculty registered successfully")
        } else {
            res.send("faculty already presented")
        }

    } else {

        res.send("please fill all feild")
    }





})

app.post("/registerStudent", async(req, res) => {

    const { name, rollno, regNo, className, phonenumber, password, age, address } = req.body
    console.log(name, rollno, regNo, className, phonenumber, password, age, address)


    if (name != undefined & rollno != undefined & regNo != undefined & className != undefined & phonenumber != undefined & password != undefined & age != undefined & address != undefined) {
        const studentSearchResponse = await regStudent.find({ studentRegistrationNo: regNo })
        console.log(studentSearchResponse)
        if (studentSearchResponse.length == 0) {
            const student = new regStudent({ studentName: name, studentRegistrationNo: regNo, studentRollNo: rollno, studentClass: className, studentPhoneNumber: phonenumber, studentPassword: password, studentAge: age, studentAddress: address });
            student.save()
            res.send("student saved successfully")
        } else {
            console.log("student is already present")
            res.send("student is already present")
        }
    } else {
        res.send("please fill all data")
    }




})

app.listen(port, () => {
    console.log(`server is running on port no ${port}`)
})