const error_function = require('../utils/responsehandler').error_function
const success_function = require('../utils/responsehandler').success_function
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const users=require('../db/users')
const products=require('../db/product')
exports.signup = async function (req,res) {

    try {
        const { name, email, password, confirmpassword, role } = req.body;

       
        const userexist = await users.findOne({ email });
       
        if (userexist) {
            let response = error_function({
                statusCode: 400,
                message: 'User already exists'
            });
            return res.status(response.statusCode).send(response.message)
        } else {

           
            const salt = bcrypt.genSaltSync(10);
            const hashed_password = bcrypt.hashSync(password, salt);
            console.log("hashedpassword : ", hashed_password);

            const new_user = await users.create({
                name,
                email,
                role,
                password: hashed_password,
            });

            if (new_user) {
                let response = success_function({
                    statusCode: 200,
                    message: "user created successfully"
                });
                return res.status(response.statusCode).send(response.message)
            } else {
                let response = error_function({
                    statusCode: 400,
                    message: 'user creation failed'
                });

                return res.status(res.statusCode).send(response.message)
            }


        }

    } catch (error) {
        let response = error_function({
            statusCode: 402,
            message: 'something went wrong'
        });
        return res.status(response.statusCode).send(response.message)
    }
}


exports.signin=async function (req,res){


    try {

        let email=req.body.email;
        let password=req.body.password;


        const user= await users.findOne({email});

        if (!user) {
            let response=error_function({
                statusCode:401,
                message:"No user found"
            });
            res.status(response.statusCode).send(response.message);
        } else {
            let db_password=user.password;

            bcrypt.compare(password, db_password, (err, auth) => {
                if (auth === true) {
                    let access_token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "1d" });
                    console.log("access_token : ", access_token);

                    let response = success_function({
                        statusCode: 200,
                        data: {
                            token: access_token,
                          
                        },
                        message: "Login Successful",
                    });
                    res.status(response.statusCode).send(response.message);
                    return;
                } else {
                    let response = error_function({
                        statusCode: 401,
                        message: "Invalid credentials"
                    });
                    res.status(response.statusCode).send(response.message);
                    return;
                }
            });
        }
    } catch (error) {
        let response=error_function({
            statusCode:402,
            message:"invalid email"
        });
        return res.status(response.statusCode).send(response.message);
    }
}

exports.seller=async function(req,res){
    const {productName,price,tags,imageFile,shippingMethod,sellerName,contactEmail} =req.body;


    const productexist=await products.findOne({productName})

    if(productexist){
        let response=error_function({
            statusCode:400,
            message:"product already exists"
        })
        return res.status(response.statusCode).send(response.message)
    }else{
        const new_product=await products.create({
            productName,
            price,
            tags,
            imageFile,
            shippingMethod,
            sellerName,
            contactEmail
        })

        if(new_product){
            let response=success_function({
                statusCode:200,
                message:"Product added Successfully"
            })
            return res.status(response.statusCode).send(response.message)
        }else{
            let response=error_function({
                statusCode:400,
                message:"product adding failed"
            })
            return res.status(response.statusCode).send(response.message)
        }
    }



}