const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const regStudent = require("./schema's/registerStudentSchema")
const regFaculty = require("./schema's/registerFacultySchema")
const cors = require('cors')
const path = require('path')


require('dotenv').config()
var bodyParser = require('body-parser');
const multer = require('multer');
const entireBookSchema = require('./schema\'s/entireBookSchema');
const singleBookSchema = require("./schema's/individualBookSchema")
const app = express()
const port = process.env.PORT || 4000;
app.use(cors())
app.use(express.json());


mongoose.connect(`mongodb+srv://ravilms:ravi%402020@cluster0.v1isd.mongodb.net/LMSDATA?retryWrites=true&w=majority`).then(() => console.log("database Connected")).catch((err) => console.log(err, "connection error"))
app.use(bodyParser.json());



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload")
    },
    filename: function(req, file, cb) {

        cb(null, Date.now() + "-")
    }
})

app.post("/loginStudent", async(req, res) => {
    console.log(req.body, "req")
    const { id, password } = req.body;

    if (id != undefined & password != undefined) {
        const studentSearch = await regStudent.find({ studentRegistrationNo: id, studentPassword: password })
        console.log(studentSearch, "reslt")
        if (studentSearch.length == 0) {
            res.send("Either registration Number or password is wrong")

        } else {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                time: Date(),
                userId: 12,
            }
            const token = jwt.sign(data, jwtSecretKey);
            console.log(token, "token")
            res.send({ message: "Student login successful", token: token, studentDetail: studentSearch, type: "student" })
        }
    } else {
        res.send("please fill all feild")
    }
})



app.post("/loginFaculty", async(req, res) => {

    console.log(req.body)
    const { id, password } = req.body;


    if (id != undefined && password != undefined) {
        const facultySearch = await regFaculty.find({ facultyRegistrationNo: id, facultyPassword: password })
        console.log(facultySearch)
        if (facultySearch.length == 0) {
            res.send("Either registration Number or password is wrong")

        } else {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                time: Date(),
                userId: 12,
            }
            const token = jwt.sign(data, jwtSecretKey);
            res.send({ message: "Faculty login successful", token: token, facultyDetail: facultySearch, type: "faculty" })
        }
    } else {
        res.send("please fill all feild")
    }
})

app.post('/upload', (req, res) => {
    let new1 = Date.now() + "-"
    console.log(new1)
    console.log(req.file, "inside /upload")
    try {
        let upload = multer({ storage: storage }).single("avatar")

        upload(req, res, function(err) {
            if (!req.file) {
                return res.send("please select and image to upload")
            } else if (err instanceof multer.MulterError) {
                return res.send(err)
            } else if (err) {
                return res.send(err)
            }
        })
        return res.status(201).json({ status: "sussess", message: "File receive successfully" })
    } catch {

    }


})
console.log(__dirname)

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

    const { stuName, rollno, regNo, className, phonenumber, password, age, address } = req.body
    console.log(stuName, rollno, regNo, className, phonenumber, password, age, address)


    if (stuName != undefined & rollno != undefined & regNo != undefined & className != undefined & phonenumber != undefined & password != undefined & age != undefined & address != undefined) {
        const studentSearchResponse = await regStudent.find({ studentRegistrationNo: regNo })
        console.log(studentSearchResponse)
        if (studentSearchResponse.length == 0) {
            const student = new regStudent({ studentName: stuName, studentRegistrationNo: regNo, studentRollNo: rollno, studentClass: className, studentPhoneNumber: phonenumber, studentPassword: password, studentAge: age, studentAddress: address });
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