const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:String,
    content:String,
    // fileName:String,
    time:String
});

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;