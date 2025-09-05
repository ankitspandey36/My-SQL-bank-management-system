const express = require('express');
const router = express.Router();
const { login,createCustomer} = require('../controllers/authController');

// Define login route
router.post('/login', login);



//create/register customer
router.post('/create', createCustomer); // Create a new customer
module.exports = router;
