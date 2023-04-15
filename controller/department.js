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
        if (req.body.Dept_Name)
            toUpdate.Dept_Name = req.body.Dept_Name;
        if (req.body.Faculty_Strength) toUpdate.Faculty_Strength = req.body.Faculty_Strength;
        if (req.body.Total_Intake) toUpdate.Total_Intake = req.body.Total_Intake;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
};
