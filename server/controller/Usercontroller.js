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
const wishlist = require('../db/wishlist');
const order = require('../db/order');
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
    const { productName, price, tags, imageBase64, shippingMethod, sellerName, contactEmail, description, userId,categories } = req.body;
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
        contactEmail,
        description,
        userId,
        categories
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
        // Fetch products associated with the userId
        const userProducts = await products.find();


        if (userProducts && userProducts.length > 0) {
            // Sending success response with fetched user products
            const response = {
                statusCode: 200,
                message: "Success",
                data: userProducts
            };
            res.status(200).json(response);
        } else {
            // Sending error response if no products found for the user
            const response = {
                statusCode: 404,
                message: "No products found for the user"
            };
            res.status(404).send(response);
        }
    } catch (error) {
        // Handling database or server errors
        console.error('Error fetching user products:', error);
        const response = {
            statusCode: 500,
            message: "Internal Server Error"
        };
        res.status(500).send(response);
    }
}

exports.getproducts = async function (req, res) {

    const userId = req.query.userId;
    console.log(userId)

    try {
        // Fetch all products from the database
        // Assuming you're querying products based on userId
        const allProducts = await products.find({ userId: userId });

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
    const { userId, rating, comment } = req.body; // Assuming userId is sent in the request body

    try {
        // Find the product by productId
        const product = await products.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find the user by userId to get userName
        const user = await users.findById(userId);
        console.log(user)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the new review to the product's reviews array with userName
        product.reviews.push({ userName: user.name, rating, comment });

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


    const userId = req.query.userId; //  userId is obtained from authenticated user
    try {
        // Find all cart items for the specified user
        const cartItems = await Cart.find({ userId });
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

exports.wishlist = async function (req, res) {
    const { userId, productId } = req.body;

    try {
        const existingwishlist = await wishlist.findOne({ userId: userId, productId: productId });

        if (existingwishlist) {
            return res.status(400).send("product already in wishlist")
        } else {
            const wishlistitem = await wishlist.create({
                userId: userId,
                productId: productId
            });
            if (wishlistitem) {
                // Return success response if cart entry was created successfully
                return res.status(200).send("added to wishlist  successfully.");
            } else {
                // Return error response if cart entry creation failed
                return res.status(400).send("Failed to add to wishlist.");
            }
        }
    } catch (error) {
        console.error("Error adding item to wishlist:", error);
        return res.status(500).send("Something went wrong.");
    }
}
exports.getwishlist = async function (req, res) {

    const userId = req.params.userId;
    console.log("userId", userId)

    try {
        const wishlistItems = await wishlist.find(userId); // assuming you have a 'user' field in your Wishlist model
        if (!wishlistItems || wishlistItems.length === 0) {
            return res.status(404).json({ message: 'no item  found on wishlist' });
        }

        // Array to store populated order items
        const populatedwishlistItems = [];

        // Loop through each order item to populate user and product details
        for (const wishlistItem of wishlistItems) {
            const user = await users.findById(wishlistItem.userId);
            const product = await products.find({ _id: { $in: wishlistItem.productId } }); // Fetch product details
            if (user && product) {
                // Construct a populated order item object
                const populatedwishlistItem = {
                    userId: user,
                    products: product,
                };
                populatedwishlistItems.push(populatedwishlistItem);
            }
        }
        console.log("item", populatedwishlistItems)
        // Return populated order items in the response
        return res.status(200).json(populatedwishlistItems);
    } catch (error) {
        res.status(500).send("something went wrong")
    }
}

exports.removeFromWishlist = async function (req, res) {
    const { userId, productId } = req.body;

    try {
        // Check if the wishlist item exists
        const existingWishlistItem = await wishlist.findOne({ userId: userId, productId: productId });

        if (!existingWishlistItem) {
            return res.status(404).send("Wishlist item not found.");
        }

        // If the wishlist item exists, remove it
        const deleteItem = await wishlist.deleteOne({
            userId: userId,
            productId: productId
        });

        if (deleteItem.deletedCount === 1) {
            return res.status(200).send("Item removed from wishlist.");
        } else {
            return res.status(500).send("Failed to remove item from wishlist.");
        }
    } catch (error) {
        console.error("Error removing item from wishlist:", error);
        return res.status(500).send("Something went wrong.");
    }
}

exports.addorder = async function (req, res) {
    try {
        const { userId, productIds } = req.body;

        // Create new order
        await order.create({ userId, productId: productIds });

        res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.removefromcart = async function (req, res) {
    const { userId, productIds } = req.body;

    try {
        // Assuming userId is used to identify the user's cart
        // Delete cart items with the provided productIds
        await Cart.deleteMany({ userId: userId, productId: { $in: productIds } });

        res.status(200).json({ message: 'Selected products deleted successfully' });
    } catch (error) {
        console.error('Error deleting selected products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



exports.myorder = async function (req, res) {
    const userId = req.query.userId;
    try {
        // Find all order items for the specified user
        const orderItems = await order.find({ userId });
        if (!orderItems || orderItems.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        // Array to store populated order items
        const populatedOrderItems = [];

        // Loop through each order item to populate user and product details
        for (const orderItem of orderItems) {
            const user = await users.findById(orderItem.userId); // Fetch user details
            const product = await products.find({ _id: { $in: orderItem.productId } }); // Fetch product details

            if (user && product) {
                // Construct a populated order item object
                const populatedOrderItem = {
                    userId: user,
                    products: product,
                };
                populatedOrderItems.push(populatedOrderItem);
            }
        }
        // Return populated order items in the response
        return res.status(200).json(populatedOrderItems);
    } catch (error) {
        console.error('Error fetching order items:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.deletecartProduct = async function (req, res) {
    const { productIds } = req.body; // Destructure productId from request body

    // Log the received productId for debugging
    console.log(`Product ID to delete: ${productIds}`);


    try {
        // Finding the product in the cart by its productId
        const products = await Cart.findOne({ productId: { $in: productIds } });



        if (!products) {
            return res.status(404).json({ message: "Product not found in the cart" });
        } else {
            // Deleting the product from the cart
            await Cart.deleteOne({ productId: { $in: productIds } });
            return res.status(200).json({ message: "Product deleted successfully from the cart" });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.deletewishlist = async function (req, res) {
    const productId = req.body;
    try {
        const product = await wishlist.find(productId);

        if (!product) {
            console.log("no product found");
            res.status(400).send("No product found in Wishlist");
        } else {
            await wishlist.deleteOne(productId);
            res.status(200).send("Item removed from wishlist")
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.getsearch = async function (req, res) {
    const keyword = req.query.keyword;
    try {
        if (keyword) {
            filter = {
                $or:[
                    {"productName":{$regex:keyword,$options:"i"}}
                ]
            };
        }
    
        const userProducts=await products.find(filter);
        if (userProducts ) {
            // Sending success response with fetched user products
            const response = {
                statusCode: 200,
                message: "Success",
                data: userProducts
            };
            res.status(200).json(response);
        }else{
            const response = {
                statusCode: 404,
                message: "No products found for the user"
            };
            res.status(404).send(response);
        } 
    } catch (error) {
        
        console.error('Error fetching user products:', error);
        const response = {
            statusCode: 500,
            message: "Internal Server Error"
        };
        res.status(500).send(response);    }

    
}

exports.getfilter = async function(req, res) {
    const {  category } = req.query; // Extract the keyword from req.body
    console.log(category)
    try {
        let filter = {};
        if (category) {
            // Assuming 'categories' is the field in your Product schema
            filter = { categories: { $regex: category, $options: "i" } };
        }
    console.log(filter)
        const userProducts = await products.find(filter);
                 console.log(userProducts)
        if (userProducts.length > 0) {
            // Sending success response with fetched user products
            const response = {
                statusCode: 200,
                message: "Success",
                data: userProducts
            };
            res.status(200).json(response);
        } else {
            const response = {
                statusCode: 404,
                message: "No products found for the user"
            };
            res.status(404).json(response);
        } 
    } catch (error) {
        console.error('Error fetching user products:', error);
        const response = {
            statusCode: 500,
            message: "Internal Server Error"
        };
        res.status(500).json(response);
    }
}
