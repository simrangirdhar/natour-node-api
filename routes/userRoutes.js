const express= require('express');
const router= express.Router();
const {getAllusers,createNewUser,getUserById,updateUserById,deleteUserById}= require("../controller/userController");

router.route('/')
.get(getAllusers)
.post(createNewUser)

router.route('/:id')
.get(getUserById)
.patch(updateUserById)
.delete(deleteUserById)
module.exports=router