const mongoose = require("mongoose");
const departmentSchema = mongoose.Schema(
  {
    Dept_Name: String,
    Faculty_Strength:{type: Number,min:20,max:150},
    Total_Intake: {type: Number,min:20,max:3500},
  },
  { collection: "Department", timestamps: true }
);
module.exports = mongoose.model("Department", departmentSchema);
