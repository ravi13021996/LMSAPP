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
const singleBookSchema = require("./schema's/assignedBooks")
const app = express()
const port = process.env.PORT || 4000;
app.use(cors())
app.use(express.static('upload'))
app.use(express.json());


mongoose.connect(`mongodb+srv://ravilms:ravi%402020@cluster0.v1isd.mongodb.net/LMSDATA?retryWrites=true&w=majority`).then(() => console.log("database Connected")).catch((err) => console.log(err, "connection error"))
app.use(bodyParser.json());



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/Books")
    },
    filename: function(req, file, cb) {
        console.log(file,"file")
        cb(null,file.originalname)
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



let upload = multer({ storage: storage })

app.post('/addBook',upload.single("bookImage"),(req,res)=>{
     
    
    fileLocation =path.join('/upload',"Elements_Of_Discreate_Mathmatics.jpg")
   
    let indiBook=new entireBookSchema({
        bookName:req.body.bookName,
        bookWritrName:req.body.writerName,
        bookGener:req.body.bookGener,
        bookQuantity:req.body.noOfCopy,
        bookAddDate:new Date(),
        bookImage:req.file.originalname

    })
    indiBook.save()
    console.log(req.file,"req.file")
    console.log(req.body,"req.body")
    res.send("Book Added Successfully")
    
    
})


app.post("/allBook",async (req,res)=>{
  let allData= await entireBookSchema.find();
  res.status(201).json(allData); 
})

app.post("/assignBook",async(req,res)=>{
    
    let date= new Date()
    date.getDate()
    console.log(req.body)
   let findStudent= await regStudent.findOne({studentRegistrationNo:req.body.bookAssignTo})
   if(findStudent!=null){
   
        let tempsingleBookSchema= new singleBookSchema({
            bookName:req.body.name,
            bookIdNo:`${date.getMilliseconds()}`,
            bookGener:req.body.bookGener,
            bookAssignTo:{
                name:findStudent.studentName,
                regId:findStudent.studentRegistrationNo
            },
            bookAssignBy:{
                name:req.body.bookAssignBy.name,
                id:req.body.bookAssignBy.id
            },
            bookAssignDate:date
        })
        tempsingleBookSchema.save().then((res)=>console.log(res)).catch((err)=>console.log(err))
        res.send("book assign to")
   }
   else{
       res.send("student not available")
   }
   //

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