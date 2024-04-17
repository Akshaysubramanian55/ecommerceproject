const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const connect = require('./db/config');
const userRoutes = require('./routes/userroutes');

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Routes
app.use(userRoutes); // Mount user routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Database connection
connect();



// Start the server
app.listen(process.env.PORT, () => {
    console.log(`server listening at http://localhost:${process.env.PORT}`);
  })
