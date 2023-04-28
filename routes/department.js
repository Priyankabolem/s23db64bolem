var express = require('express');
var router = express.Router();

/* GET home page. */
const department_controllers= require('../controller/department');

// A little function to check if we have an authorized user and continue on
// or
// redirect to login.
const secured = (req, res, next) => {
 if (req.user){
 return next();
 }
 req.session.returnTo = req.originalUrl;
 res.redirect("/login");
 }


router.get('/',department_controllers.department_view_all_Page );

router.get('/details',department_controllers.department_view_one_Page);
// GET create department page */
router.get('/create', department_controllers.department_create_Page);
/* GET create update page */
router.get('/update', secured, department_controllers.department_update_Page);
/* GET delete costume page */
router.get('/delete', department_controllers.department_delete_Page)

module.exports = router;