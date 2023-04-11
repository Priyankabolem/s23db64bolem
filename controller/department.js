var Department = require('../models/department');
// List of all Department
exports.department_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Department list');
    };
// for a specific Department.
exports.department_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Department detail: ' + req.params.id);
    };
 // Handle Department create on POST.
    exports.department_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Department create POST');
    };
 // Handle Department delete form on DELETE.
    exports.department_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Department delete DELETE ' + req.params.id);
    };
// Handle Department update form on PUT.
    exports.department_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Department update PUT' + req.params.id);
    };
    