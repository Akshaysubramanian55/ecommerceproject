const express=require('express');
const router=express.Router();

const Usercontroller=require('../controller/Usercontroller')

router.post('/signup',Usercontroller.signup);
router.post('/signin',Usercontroller.signin);
router.post('/seller',Usercontroller.seller);
router.get('/getuser',Usercontroller.getuser);
router.get('/getproduct',Usercontroller.getproducts);
router.get('/details/:productId',Usercontroller.productdetails);// for seller
router.put('/:productId',Usercontroller.Updateproduct);
router.get('/cart/:productId',Usercontroller.cartproducts);
router.post('/:productId',Usercontroller.reviews);
router.post('/cart/add',Usercontroller.addcart);
router.get('/mycart',Usercontroller.mycart);

module.exports=router;
