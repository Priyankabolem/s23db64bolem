var Department = require('../models/department');
// VIEWS
// Handle a show all view
exports.department_view_all_Page = async function(req, res) {
    try{
    var theDepartment = await Department.find();
    res.render('department', { title: 'Department Search Results', results: theDepartment });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

// List of all Department
exports.department_list = async function(req, res) {
    try{
        var theDepartment = await Department.find();
        res.send(theDepartment);
        }
        catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }
        };

// for a specific Department.
exports.department_detail = async function(req, res) {
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
exports.department_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Department();
    document.Dept_Name = req.body.Dept_Name;
    document.Faculty_Strength = req.body.Faculty_Strength;
    document.Total_Intake = req.body.Total_Intake;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
    
 // Handle Department delete form on DELETE.
    exports.department_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Department delete DELETE ' + req.params.id);
    };
// Handle Department update form on PUT.
    exports.department_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Department update PUT' + req.params.id);
    };
    