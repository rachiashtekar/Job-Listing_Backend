// const express = require('express')
// const mongoose = require('mongoose')
// const morgan = require('morgan')
// const dotenv = require('dotenv')
// const connectDB = require('./config/database')
// const AuthRoute = require('./Routes/AuthRoute')
// const jobRoute = require ('./Routes/jobRoute')
// const profileRoute = require('./Routes/ProfileRoute')
// const cors = require('cors');

// const app = express()



// //configure env
// dotenv.config()



// //middleware
// app.use(express.json());
// app.use(cors());

// app.use("/api/v1/auth", AuthRoute);
// app.use("/api/v1/job",jobRoute);
// app.use('/api/v1/user', profileRoute); 

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// //PORT
// const PORT = process.env.PORT || 3002;



// //database config
// connectDB();

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`)
// })

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const AuthRoute = require('./Routes/AuthRoute');
const jobRoute = require('./Routes/jobRoute');
const profileRoute = require('./Routes/profileRoute');
const cors = require('cors');
const { getUserJobs } = require('../server/Controllers/JobControllers');

const app = express();

// Configure environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Mount routes
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/job", jobRoute);
// app.use('/api/v1/user/profile', profileRoute);
app.use('/api/v1/auth/profile', profileRoute);
app.use('/api/v1/auth/user',getUserJobs) // Corrected route mounting

// Define a test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// PORT
const PORT = process.env.PORT || 3002;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
