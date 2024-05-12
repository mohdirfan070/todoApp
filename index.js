const express  = require("express");
const app  =  express();
require('dotenv').config(console.log("ENV aaya"));
const path = require("path");
app.use(express.static(path.join(__dirname,"public/")));
app.use(express.urlencoded({extended:true}));
app.set(path.join(__dirname,"views"));
app.set("view engine","views");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const mongoose = require('mongoose');
main().then(()=>{
    console.log("Connected Succesfully!");
}).catch(err => console.log("error during connecting to database is:"+err));

async function main() {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI);
  }
//   'mongodb://127.0.0.1:27017/todo'
const User = require("./models/userSchema.js");
const Task = require("./models/taskSchema.js");

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Listenning On PORT:"+PORT);
});1


app.get("/",async (req,res)=>{
    try {
        let data = await Task.find({});
        // console.log(data);
        if(data){
            res.render("home.ejs",{data});
        }else{
            data = [];
            res.render("home.ejs",{data});
        }
    } catch (error) {
        data = [];
        res.render("home.ejs",{data});
    }
    });

app.get("/home",async (req,res)=>{
    try {
        let data = await Task.find({});
        // console.log(data);
        if(data){
            res.render("home.ejs",{data});
        }else{
            data = [];
            res.render("home.ejs",{data});
        }
    } catch (error) {
        data = [];
        res.render("home.ejs",{data});
    }
    
});

app.post("/home/add",async(req,res)=>{
   let {title,content}=req.body;

    await Task.insertMany([{title:title,content:content,time:Date().slice(0,24)}]).then(()=>{
        console.log("Added new Tasks Successfully");
        res.redirect("/home");
       }) 

   
//    console.log({title,content});
  
});


app.delete("/home/delete/:id",async(req,res)=>{
    let {id}=req.params;
  await Task.findByIdAndDelete(id).then(()=>{res.redirect("/home")});
});



app.get("/home/edit/:id",async(req,res)=>{
    let {id}= req.params;
   let task = await Task.findById(id);
//    console.log(task);
    res.render("edit.ejs",{task});
});

app.patch("/home/edited/:id",async(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let {newtitle,newcontent}=req.body;
    // console.log({newtitle,newcontent});
    await Task.findByIdAndUpdate(id,{title:newtitle,content:newcontent,time:Date().slice(0,24),new:true});
res.redirect("/home");
});


