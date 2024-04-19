const express=require('express');
const router=express.Router();

const Usercontroller=require('../controller/Usercontroller')

router.post('/signup',Usercontroller.signup);
router.post('/signin',Usercontroller.signin);
router.post('/seller',Usercontroller.seller);
router.get('/getuser',Usercontroller.getuser);
router.get('/getproduct',Usercontroller.getproducts);
router.get('/:productId',Usercontroller.productdetails);
router.put('/:productId',Usercontroller.Updateproduct);
router.get('/:productId',Usercontroller.cartproducts)
module.exports=router;
