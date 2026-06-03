const mongoose = require("mongoose");

const branch = new mongoose.Schema({
    branch:{
        type:String,
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model("Branch", branch);