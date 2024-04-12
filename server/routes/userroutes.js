const express=require('express');
const router=express.Router();

const Usercontroller=require('../controller/Usercontroller')

router.post('/signup',Usercontroller.signup);
router.post('/signin',Usercontroller.signin);
module.exports=router;
