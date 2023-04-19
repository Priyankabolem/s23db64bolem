var express = require("express");
var router = express.Router();

/* GET home page. */
const department_controllers = require("../controller/department");

router.get("/", department_controllers.department_view_all_Page);

router.get("/details", department_controllers.department_view_one_Page);
// GET create department page */
router.get("/create", department_controllers.department_create_Page);
module.exports = router;
