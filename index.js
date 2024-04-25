const express  = require("express");
const app  =  express();
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
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo');
}
const Task = require("./models/taskSchema.js");
const { title } = require("process");


app.listen(8080,()=>{
    console.log("Listenning On PORT:8080");
});

app.get("/",(req,res)=>{

    res.render("home.ejs");
});
app.get("/home",async(req,res)=>{
    let data = await Task.find({});
     res.render("home.ejs",{data});
});

app.post("/home/add",async(req,res)=>{
   let {title,content}=req.body;
   if(title!=""||content!=""){
    await Task.insertMany([{title:title,content:content,time:Date().slice(0,24)}]).then(()=>{
        console.log("Added new Tasks Successfully");
        res.redirect("/home");
       }) 
   }
   
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

app.put("/home/edited/:id",async(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let {newtitle,newcontent}=req.body;
    // console.log({newtitle,newcontent});
    await Task.findByIdAndUpdate(id,{title:newtitle,content:newcontent,time:Date().slice(0,24),new:true});
res.redirect("/home");
});