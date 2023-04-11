var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controller/api');
var department_controller = require('../controller/department');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// DEPARTMENT ROUTES ///
// POST request for creating a Department.
router.post('/department', department_controller.department_create_post);
// DELETE request to delete Department.
router.delete('/department/:id', department_controller.department_delete);
// PUT request to update Department.
router.put('/department/:id', department_controller.department_update_put);
// GET request for one Department.
router.get('/department/:id', department_controller.department_detail);
// GET request for list of all Department items.
router.get('/department', department_controller.department_list);
module.exports = router;