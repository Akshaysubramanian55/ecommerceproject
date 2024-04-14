const express=require('express');
const router=express.Router();

const Usercontroller=require('../controller/Usercontroller')

router.post('/signup',Usercontroller.signup);
router.post('/signin',Usercontroller.signin);
router.post('/seller',Usercontroller.seller);
router.get('/getproducts',Usercontroller.getuser);
module.exports=router;
