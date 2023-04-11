const mongoose = require("mongoose");
const departmentSchema = mongoose.Schema({
  Dept_Name: String,
  Faculty_Strength: Number,
  Total_Intake: Number,
},{ collection:'Department',timestamps:true});
module.exports = mongoose.model("Department", departmentSchema);