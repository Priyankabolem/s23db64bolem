var express = require('express');
var router = express.Router();

/* GET home page. */
const department_controlers= require('../controller/department');


router.get('/',department_controlers.department_view_all_Page );

module.exports = router;