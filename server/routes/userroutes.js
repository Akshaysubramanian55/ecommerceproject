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
router.post('/wishlist/add',Usercontroller.wishlist);
router.get('/wishlist/item',Usercontroller.getwishlist);
router.delete('/wishlist/remove',Usercontroller.removeFromWishlist);
router.post('/order/add',Usercontroller.addorder);
router.delete('/mycart/delete',Usercontroller.removefromcart);
router.get('/order/item',Usercontroller.myorder);
router.delete('/cartproduct/delete',Usercontroller.deletecartProduct);
router.delete('/wishlist/delete',Usercontroller.deletewishlist);
router.get('/filterproducts',Usercontroller.getsearch);
module.exports=router;
