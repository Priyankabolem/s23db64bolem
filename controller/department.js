var Department = require('../models/department');
// VIEWS
// Handle a show all view
exports.department_view_all_Page = async function (req, res) {
    try {
        var theDepartment = await Department.find();
        res.render('department', { title: 'Department Search Results', results: theDepartment });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// List of all Department
exports.department_list = async function (req, res) {
    try {
        var theDepartment = await Department.find();
        res.send(theDepartment);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific Department.
exports.department_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Department.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle Department create on POST.
exports.department_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Department();
    document.Dept_Name = req.body.Dept_Name;
    document.Faculty_Strength = req.body.Faculty_Strength;
    document.Total_Intake = req.body.Total_Intake;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Department delete form on DELETE.
exports.department_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Department.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};
// Handle Department update form on PUT.
exports.department_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Department.findById(req.params.id)
        // Do updates of properties
        if (req.body.departmentName)
            toUpdate.Dept_Name = req.body.departmentName;
        if (req.body.departmentStrength) 
        toUpdate.Faculty_Strength = req.body.departmentStrength;
        if (req.body.departmentIntake) 
        toUpdate.Total_Intake = req.body.departmentIntake;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
};

// Handle a show one view with id specified by query
exports.department_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    const result = await Department.findById(req.query.id);
    console.log(result);
    res.render('departmentdetail', 
   { title: 'Department Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
}

// Handle building the view for creating a department.
// No body, no in path parameter, no query.
// Does not need to be async
exports.department_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('departmentcreate', { title: 'Department Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
// Handle building the view for updating a Department.
// query provides the id
exports.department_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await Department.findById(req.query.id)
    res.render('departmentupdate', { title: 'Department Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
// Handle a delete one view with id from query
exports.department_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Department.findById(req.query.id)
    res.render('departmentdelete', { title: 'Department Delete', toShow: 
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   }
   
    
