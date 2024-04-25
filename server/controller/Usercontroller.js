const error_function = require('../utils/responsehandler').error_function
const success_function = require('../utils/responsehandler').success_function
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const users = require('../db/users')
const products = require('../db/product')
const path = require('path');
const fs = require('fs');
const Cart = require('../db/cart');
const mongoose = require('mongoose');


exports.signup = async function (req, res) {

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


exports.signin = async function (req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await users.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "No user found" });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Generate JWT token
            const accessToken = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "1d" });

            // Send success response with token and user role
            return res.status(200).json({
                token: accessToken,
                role: user.role,
                message: "Login Successful"
            });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.seller = async function (req, res) {
    const { productName, price, tags, imageBase64, shippingMethod, sellerName, contactEmail } = req.body;

    console.log(req.body)
    const Image = imageBase64.split(';base64,').pop();
    const binaryImage = Buffer.from(Image, 'base64');


    // Save the image to the server's file system

    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    const fileName = `${Date.now()}.png`;

    const relativePath = `/uploads/${fileName}`;


    // Write buffer to file
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, binaryImage);

    const new_product = await products.create({
        productName,
        price,
        tags,
        imageFile: relativePath,
        shippingMethod,
        sellerName,
        contactEmail
    })

    if (new_product) {
        let response = success_function({
            statusCode: 200,
            message: "Product added Successfully"
        })
        return res.status(response.statusCode).send(response.message)
    } else {
        let response = error_function({
            statusCode: 400,
            message: "product adding failed"
        })
        return res.status(response.statusCode).send(response.message)
    }

}





exports.getuser = async function (req, res) {

    try {
        // Fetch all products from the database
        const allProducts = await products.find();

        if (allProducts && allProducts.length > 0) {
            // Sending success response with fetched products
            const response = {
                statusCode: 200,
                message: "Success",
                data: allProducts
            };
            res.status(200).json(response);
        } else {
            // Sending error response if no products found
            const response = {
                statusCode: 404,
                message: "No products found"
            };
            res.status(404).send(response);
        }
    } catch (error) {
        // Handling database or server errors
        console.error('Error fetching products:', error);
        const response = {
            statusCode: 500,
            message: "Internal Server Error"
        };
        res.status(500).send(response);
    }
}

exports.getproducts = async function (req, res) {


    try {
        // Fetch all products from the database
        const allProducts = await products.find();

        if (allProducts && allProducts.length > 0) {
            // Sending success response with fetched products
            const response = {
                statusCode: 200,
                message: "Success",
                data: allProducts
            };
            res.status(200).send(response);
        } else {
            // Sending error response if no products found
            const response = {
                statusCode: 404,
                message: "No products found"
            };
            res.status(404).send(response);
        }
    } catch (error) {
        // Handling database or server errors
        console.error('Error fetching products:', error);
        const response = {
            statusCode: 500,
            message: "Internal Server Error"
        };
        res.status(500).send(response);
    }

}

exports.productdetails = async function (req, res) {
    try {
        const productId = req.params.productId;

        // Check if productId is a valid ObjectId
        if (!mongoose.isValidObjectId(productId)) {
           
            return res.status(400).json({ error: 'Invalid productId' });
        }
        const product = await products.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
exports.Updateproduct = async function (req, res) {


    const productId = req.params.productId;
    const productData = req.body;



    try {
        const updateproduct = await products.findByIdAndUpdate(productId, productData, { new: true });

        if (updateproduct) {
            // Sending response with updated user
            const response = {
                statusCode: 200,
                message: "User updated successfully",
                data: updateproduct
            };
            res.status(200).send(response);
        } else {
            // Sending error response if user not found
            const response = {
                statusCode: 404,
                message: "User not found"
            };
            res.status(404).send(response);
        }
    } catch (error) {
        console.error("Error updating user:", error);
        const response = {
            statusCode: 500,
            message: "Internal server error"
        };
        res.status(500).send(response);
    }
}
exports.cartproducts = async function (req, res) {
    try {
        const productId = req.params.productId;
       
        const product = await products.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'User not found' });
        }


        res.json(product);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.reviews = async function (req, res) {
    const productId = req.params.productId;
    const { userName, rating, comment } = req.body;

    try {
        // Find the product by productId
        const product = await products.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Add the new review to the product's reviews array
        product.reviews.push({ userName, rating, comment });

        // Save the updated product document
        await product.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
}
exports.addcart = async function (req, res) {

    const { userId, productId } = req.body;
    try {
        // Check if the cart entry already exists for the given userId and productId
        const existingCartEntry = await Cart.findOne({ userId: userId, productId: productId });

        if (existingCartEntry) {
            // If the cart entry already exists, return a message indicating that it's a duplicate
            return res.status(400).send("This product is already in the user's cart.");
        } else {
            // Create a new cart entry if it doesn't already exist
            const cartEntry = await Cart.create({
                userId: userId,
                productId: productId
            });

            if (cartEntry) {
                // Return success response if cart entry was created successfully
                return res.status(200).send("Cart item added successfully.");
            } else {
                // Return error response if cart entry creation failed
                return res.status(400).send("Failed to add item to cart.");
            }
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error adding item to cart:", error);
        return res.status(500).send("Something went wrong.");
    }


}


exports.mycart = async function (req, res) {


    const userId = req.body.userId; // Assuming userId is obtained from authenticated user
    console.log(userId)
    try {
        // Find all cart items for the specified user
        const cartItems = await Cart.find({ userId });
        console.log(cartItems)
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        // Array to store populated cart items
        const populatedCartItems = [];

        // Loop through each cart item to populate user and product details
        for (const cartItem of cartItems) {
            const user = await users.findById(cartItem.userId); // Fetch user details
            const product = await products.findById(cartItem.productId); // Fetch product details

            if (user && product) {
                // Construct a populated cart item object
                const populatedCartItem = {
                    userId: user,
                    productId: product,
                    quantity: cartItem.quantity
                };
                populatedCartItems.push(populatedCartItem);
            }
        }

        // Return populated cart items in the response
        return res.status(200).json(populatedCartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
