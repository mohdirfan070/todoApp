const mongoose = require('mongoose');
async function main() {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI);
  }
const taskSchema = new mongoose.Schema({
    title:String,
    content:String,
    // fileName:String,
    time:String
});

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;