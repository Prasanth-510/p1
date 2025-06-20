const express = require("express")
const multer  = require("multer")
const mongoose = require("mongoose")
const port = 8000;

const app = express()
app.use(express.json())


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, Date.now() + "_" + file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })

app.post("/single", upload.single("excel"), (req,res)=>{
    console.log(req.file)
})

app.listen(port, async() => {
    console.log(`Server is listening at http://localhost:${port}`);
    try{
        await mongoose.connect("mongodb+srv://jaikanthsivakumar:uzdIPSKHBXnCo6zh@cluster0.xjfencx.mongodb.net/")
        console.log("DataBase is connected")
    }
    catch (error){
        console.log("Error in connecting with DataBase")
    }
});