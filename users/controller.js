var express= require("express")
var router=express.Router()
var userService=require("./userService")
var {list, addUser}=require("./userService")
var validate = require("../middlewares/validation")
const authenticate = require ('../middlewares/authenticate')

router.get("/add/:name/:pwd",userService.add)
router.get("/list", authenticate, list)
router.post("/adduser",validate, addUser)
router.delete("/deleteId/:id", userService.deleteUser)
router.put("/modif/:id",validate, userService.modifUser)
//router.put("/update/:id", userService.updateUser)


router.get('/chat', function(req, res, next) {
    res.render('chat', { title: 'Express' });
  });



module.exports= router