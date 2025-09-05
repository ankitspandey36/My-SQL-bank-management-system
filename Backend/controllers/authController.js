const db = require("../config/db");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
require('dotenv').config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


const createCustomer = async (req, res) => {
  try {
    const { CustomerID, Password, FirstName, LastName, Address, Email, Phone, BranchID } = req.body;

    // Validate required fields
    if (!CustomerID || !Password || !FirstName || !LastName || !Address || !Email || !Phone) {
      return res.status(400).send({
        success: false,
        message: "All fields except BranchID are required",
      });
    }

    // Check if BranchID exists
    if (BranchID) {
      const [branchExists] = await db.execute("SELECT 1 FROM Branches WHERE BranchID = ?", [BranchID]);
      if (!branchExists) {
        return res.status(400).send({
          success: false,
          message: "Invalid BranchID. Branch does not exist.",
        });
      }
    }

    //password hashed
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(Password, salt)

    // Insert customer into the database
    const [result] = await db.execute(
      "INSERT INTO Customers (CustomerID,  FirstName, LastName, Address, Email, Phone, BranchID, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [CustomerID, FirstName, LastName, Address, Email, Phone, BranchID || null, hashedpassword]
    );

    // Log the stored customer data
    console.log("Customer data stored in the database:", {
      CustomerID,
      Password,
      FirstName,
      LastName,
      Address,
      Email,
      Phone,
      BranchID: BranchID || null,
    });

    // Respond to the client
    res.status(201).send({
      success: true,
      message: "Customer created successfully",
      data: {
        CustomerID,
        FirstName,
        LastName,
        Address,
        Email,
        Phone,
        Password,
        BranchID: BranchID || null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error creating customer",
      error,
    });
  }
};



const login = async (req, res) => {
  //this is working
  const { CustomerID, Password } = req.body;
  console.log('Incoming request body:', req.body);

  if (!CustomerID || !Password) {
    return res.status(400).json({ message: 'CustomerID and Password are required' });
  }
  console.log('CustomerID:', CustomerID);
  console.log('Password:', Password);

  try {
    // Query the customer by CustomerID
    const [result] = await db.execute(
      "SELECT * FROM Customers WHERE CustomerID = ?",
      [CustomerID]
    );
    console.log('result:', result);
    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid CustomerID or Password' });
    }

    const customer = result[0];

    const isMatch = await bcrypt.compare(Password, customer.Password);

    // If passwords are hashed, uncomment the below line and remove the above line:
    // const isMatch = await bcrypt.compare(Password, customer.Password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: customer.CustomerID, CustomerID: customer.CustomerID },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    console.log('Token:', token);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      customer: {
        id: customer.CustomerID,
        firstName: customer.FirstName,
        lastName: customer.LastName,
        CustomerID: customer.CustomerID,
      },
    });
  } catch (queryError) {
    console.error('Database query error:', queryError);
    return res.status(500).json({ message: 'Database query error' });
  }
};

module.exports = { login, createCustomer };
