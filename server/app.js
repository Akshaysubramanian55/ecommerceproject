const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const connect = require('./db/config');
const userRoutes = require('./routes/userroutes');

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use(userRoutes); // Mount user routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/getproduct', userRoutes);
app.use('/updateproduct',userRoutes)
app.use('/cartproduct',userRoutes)
app.use('/addreview',userRoutes)
// Database connection
connect();



// Start the server
app.listen(process.env.PORT, () => {
    console.log(`server listening at http://localhost:${process.env.PORT}`);
  })
