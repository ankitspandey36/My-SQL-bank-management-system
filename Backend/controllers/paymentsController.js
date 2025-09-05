const db = require("../config/db");


function generatePaymentID() {
    const prefix = "PID-";  // The prefix for the PaymentID
    const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000); // Generate 10 random digits
    return prefix + randomDigits;  // Combine the prefix and the random digits
  }
//create payment
// const createPayment = async (req, res) => {
//     try {
//         let { LoanID, Amount, PaymentMethod } = req.body;
//         console.log(`LoanID: ${LoanID}`);
//         Amount=parseInt(Amount)
//         console.log(`Amount: ${Amount}`);
        
//         console.log(`PaymentMethod: ${PaymentMethod}`);
//         // Validate input fields
//         if (!LoanID || !Amount || !PaymentMethod) {
//             return res.status(400).send({
//                 success: false,
//                 message: "LoanID, Amount, and PaymentMethod are required.",
//             });
//         }

//         // Fetch loan details to validate LoanID and get details
//         const [loanDetails] = await db.execute('SELECT * FROM Loans WHERE LoanID = ?', [LoanID]);

//         if (!loanDetails || loanDetails.length === 0) {
//             return res.status(404).send({
//                 success: false,
//                 message: `LoanID ${LoanID} does not exist.`,
//             });
//         }

//         //const { Amount: LoanBalance, CustomerID } = loanDetails[0];
// const LoanBalance=loanDetails[0].Amount;

//         // Check if payment amount is less than or equal to loan balance
//         if (Amount > LoanBalance) {
//             return res.status(400).send({
//                 success: false,
//                 message: `Payment amount exceeds the loan balance of ${LoanBalance}.`,
//             });
//         }
// const [AccountBalance]=await db.execute('Select a.Balance from Loans l JOIN Customers c ON l.CustomerID = c.CustomerID  JOIN Accounts a ON c.CustomerID = a.CustomerID where l.LoanID=?',[LoanID]);

// const remainingBalance = LoanBalance - Amount;
//         let loanStatus = `Remaining balance: ${remainingBalance}`;
//         console.log(remainingBalance);
//         if (remainingBalance <= 0) {
//             // Remove the loan if fully paid
//             await db.execute('DELETE FROM Loans WHERE LoanID = ?', [LoanID]);
            
//             loanStatus = "Loan fully paid and removed";
//         }

// if (AccountBalance[0].Balance<Amount){
//     console.log(AccountBalance[0].Balance);
//     console.log(Amount);
//     return res.status(400).send({
//         success: false,
//         message: `Insufficient account balance for payemnt of ${Amount}`,
//     });
// }
// await db.execute(
//     'UPDATE Accounts a JOIN Customers c ON a.CustomerID = c.CustomerID JOIN Loans l ON c.CustomerID = l.CustomerID SET a.Balance = a.Balance - ? WHERE l.LoanID = ?',
//     [Amount, LoanID]
//   );
//   const PaymentID = generatePaymentID();

//         // Insert payment into Payments table without setting PaymentID (it will auto-generate)
//         await db.execute(
//             'INSERT INTO Payments (PaymentID, LoanID, Amount, PaymentDate, PaymentMethod) VALUES (?, ?, ?, NOW(), ?)',
//             [PaymentID, LoanID, Amount, PaymentMethod]
//         );
        
//         // Retrieve the auto-generated PaymentID
//         const [result] = await db.execute('SELECT LAST_INSERT_ID() AS PaymentID');
//         const paymentID = result[0].PaymentID;

//         // Deduct payment amount from Loan balance
//         await db.execute('UPDATE Loans SET Amount = Amount - ? WHERE LoanID = ?', [Amount, LoanID]);

//         // Check if loan is fully paid
//         // const remainingBalance = LoanBalance - Amount;
//         // let loanStatus = `Remaining balance: ${remainingBalance}`;
//         // console.log(remainingBalance);
//         // if (remainingBalance <= 0) {
//         //     // Remove the loan if fully paid
//         //     await db.execute('DELETE FROM Loans WHERE LoanID = ?', [LoanID]);
            
//         //     loanStatus = "Loan fully paid and removed";
//         // }

//         // Fetch updated remaining balance and loan details using a join
//         const [updatedDetails] = await db.execute(
//             `SELECT 
//                 p.PaymentID,
//                 c.CustomerID,
//                 c.FirstName,
//                 c.LastName,
//                 a.Balance AS AccountBalance,
//                 l.Amount AS RemainingLoan
//              FROM Payments p
//              LEFT JOIN Loans l ON p.LoanID = l.LoanID
//              LEFT JOIN Customers c ON l.CustomerID = c.CustomerID
//              LEFT JOIN Accounts a ON c.CustomerID = a.CustomerID
//              WHERE p.PaymentID = ?`,
//             [paymentID]  // Fetching details of the specific payment
//         );

//         res.status(201).send({
//             success: true,
//             message: "Payment successfully recorded.",
//             paymentDetails: {
//                 PaymentID: paymentID, // Displaying the auto-generated PaymentID
//                 LoanID,
//                 Amount,
//                 PaymentMethod,
//                 PaymentDate: new Date().toISOString().split('T')[0],
//             },
//             loanStatus,
//             updatedCustomerDetails: updatedDetails[0], // Updated account and loan information
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: "Error creating payment",
//             error: error.message || error,
//         });
//     }
// };




// //create payment
// const createPayment = async (req, res) => {
//     try {
//         let { LoanID, Amount, PaymentMethod } = req.body;
//         console.log(`LoanID: ${LoanID}`);
//         Amount=parseInt(Amount)
//         console.log(`Amount: ${Amount}`);
        
//         console.log(`PaymentMethod: ${PaymentMethod}`);
//         // Validate input fields
//         if (!LoanID || !Amount || !PaymentMethod) {
//             return res.status(400).send({
//                 success: false,
//                 message: "LoanID, Amount, and PaymentMethod are required.",
//             });
//         }

//         // Fetch loan details to validate LoanID and get details
//         const [loanDetails] = await db.execute('SELECT * FROM Loans WHERE LoanID = ?', [LoanID]);

//         if (!loanDetails || loanDetails.length === 0) {
//             return res.status(404).send({
//                 success: false,
//                 message: `LoanID ${LoanID} does not exist.`,
//             });
//         }

//         //const { Amount: LoanBalance, CustomerID } = loanDetails[0];
// const LoanBalance=loanDetails[0].Amount;

//         // Check if payment amount is less than or equal to loan balance
//         if (Amount > LoanBalance) {
//             return res.status(400).send({
//                 success: false,
//                 message: `Payment amount exceeds the loan balance of ${LoanBalance}.`,
//             });
//         }
// const [AccountBalance]=await db.execute('Select a.Balance from Loans l JOIN Customers c ON l.CustomerID = c.CustomerID  JOIN Accounts a ON c.CustomerID = a.CustomerID where l.LoanID=?',[LoanID]);

// const remainingBalance = LoanBalance - Amount;
//         let loanStatus = `Remaining balance: ${remainingBalance}`;
//         console.log(remainingBalance);
//         if (remainingBalance <= 0) {
           
//             // Remove the loan if fully paid
//             await db.execute(
//                 'UPDATE Accounts a JOIN Customers c ON a.CustomerID = c.CustomerID JOIN Loans l ON c.CustomerID = l.CustomerID SET a.Balance = a.Balance - ? WHERE l.LoanID = ?',
//                 [Amount, LoanID]
//               );
              


//             await db.execute('DELETE FROM Loans WHERE LoanID = ?', [LoanID]);
            
            

//             res.status(201).send({
//                 success: true,
//                 message: "Loan fully paid and removed.",
//                 paymentDetails: {
//                     // Displaying the auto-generated PaymentID
//                     LoanID,
//                     Amount,
//                     PaymentMethod,
//                     PaymentDate: new Date().toISOString().split('T')[0],
//                 },
              
//             });

//         }

// if (AccountBalance[0].Balance<Amount){
//     console.log(AccountBalance[0].Balance);
//     console.log(Amount);
//     return res.status(400).send({
//         success: false,
//         message: `Insufficient account balance for payemnt of ${Amount}`,
//     });
// }

// await db.execute(
//     'UPDATE Accounts a JOIN Customers c ON a.CustomerID = c.CustomerID JOIN Loans l ON c.CustomerID = l.CustomerID SET a.Balance = a.Balance - ? WHERE l.LoanID = ?',
//     [Amount, LoanID]
//   );
  
//   const PaymentID = generatePaymentID();

//         // Insert payment into Payments table without setting PaymentID (it will auto-generate)
//         await db.execute(
//             'INSERT INTO Payments (PaymentID, LoanID, Amount, PaymentDate, PaymentMethod) VALUES (?, ?, ?, NOW(), ?)',
//             [PaymentID, LoanID, Amount, PaymentMethod]
//         );
        
//         // Retrieve the auto-generated PaymentID
//         const [result] = await db.execute('SELECT LAST_INSERT_ID() AS PaymentID');
//         const paymentID = result[0].PaymentID;

//         // Deduct payment amount from Loan balance
//         await db.execute('UPDATE Loans SET Amount = Amount - ? WHERE LoanID = ?', [Amount, LoanID]);

//         // Check if loan is fully paid
//         // const remainingBalance = LoanBalance - Amount;
//         // let loanStatus = `Remaining balance: ${remainingBalance}`;
//         // console.log(remainingBalance);
//         // if (remainingBalance <= 0) {
//         //     // Remove the loan if fully paid
//         //     await db.execute('DELETE FROM Loans WHERE LoanID = ?', [LoanID]);
            
//         //     loanStatus = "Loan fully paid and removed";
//         // }

//         // Fetch updated remaining balance and loan details using a join
//         const [updatedDetails] = await db.execute(
//             `SELECT 
//                 p.PaymentID,
//                 c.CustomerID,
//                 c.FirstName,
//                 c.LastName,
//                 a.Balance AS AccountBalance,
//                 l.Amount AS RemainingLoan
//              FROM Payments p
//              LEFT JOIN Loans l ON p.LoanID = l.LoanID
//              LEFT JOIN Customers c ON l.CustomerID = c.CustomerID
//              LEFT JOIN Accounts a ON c.CustomerID = a.CustomerID
//              WHERE p.PaymentID = ?`,
//             [paymentID]  // Fetching details of the specific payment
//         );

//         res.status(201).send({
//             success: true,
//             message: "Payment successfully recorded.",
//             paymentDetails: {
//                 PaymentID: paymentID, // Displaying the auto-generated PaymentID
//                 LoanID,
//                 Amount,
//                 PaymentMethod,
//                 PaymentDate: new Date().toISOString().split('T')[0],
//             },
//             loanStatus,
//             updatedCustomerDetails: updatedDetails[0], // Updated account and loan information
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: "Error creating payment",
//             error: error.message || error,
//         });
//     }
// };




const createPayment = async (req, res) => {
    try {
        let { LoanID, Amount, PaymentMethod } = req.body;
        console.log(`LoanID: ${LoanID}`);
        Amount = parseInt(Amount);  // Ensure Amount is an integer
        console.log(`Amount: ${Amount}`);
        
        console.log(`PaymentMethod: ${PaymentMethod}`);
        
        // Validate input fields
        if (!LoanID || !Amount || !PaymentMethod) {
            return res.status(400).send({
                success: false,
                message: "LoanID, Amount, and PaymentMethod are required.",
            });
        }

        // Fetch loan details to validate LoanID and get details
        const [loanDetails] = await db.execute('SELECT * FROM Loans WHERE LoanID = ?', [LoanID]);

        if (!loanDetails || loanDetails.length === 0) {
            return res.status(404).send({
                success: false,
                message: `LoanID ${LoanID} does not exist.`,
            });
        }

        const LoanBalance = loanDetails[0].Amount;

        // Check if payment amount is less than or equal to loan balance
        if (Amount > LoanBalance) {
            return res.status(400).send({
                success: false,
                message: `Payment amount exceeds the loan balance of ${LoanBalance}.`,
            });
        }

        // Check account balance for sufficient funds
        const [AccountBalance] = await db.execute('SELECT a.Balance FROM Accounts a JOIN Customers c ON a.CustomerID = c.CustomerID WHERE c.CustomerID = ?', [loanDetails[0].CustomerID]);

        if (AccountBalance[0].Balance < Amount) {
            return res.status(400).send({
                success: false,
                message: `Insufficient account balance for payment of ${Amount}.`,
            });
        }

        // Deduct payment from account balance
        await db.execute(
            'UPDATE Accounts a JOIN Customers c ON a.CustomerID = c.CustomerID SET a.Balance = a.Balance - ? WHERE c.CustomerID = ?',
            [Amount, loanDetails[0].CustomerID]
        );

        const PaymentID = generatePaymentID(); // Assuming generatePaymentID() is a function to generate PaymentID

        // Insert payment into Payments table
        await db.execute(
            'INSERT INTO Payments (PaymentID, LoanID, Amount, PaymentDate, PaymentMethod) VALUES (?, ?, ?, NOW(), ?)',
            [PaymentID, LoanID, Amount, PaymentMethod]
        );

        // Deduct payment from Loan balance
        await db.execute('UPDATE Loans SET Amount = Amount - ? WHERE LoanID = ?', [Amount, LoanID]);

        // Check if loan is fully paid
        const remainingBalance = LoanBalance - Amount;
        let loanStatus = `Remaining balance: ${remainingBalance}`;
        
        if (remainingBalance <= 0) {
            // Remove the loan if fully paid and the associated payments will be deleted automatically due to ON DELETE CASCADE
            await db.execute('DELETE FROM Loans WHERE LoanID = ?', [LoanID]);
            loanStatus = "Loan fully paid and removed";
        }

        // Fetch updated remaining balance and loan details using a join
        const [updatedDetails] = await db.execute(
            `SELECT 
                p.PaymentID,
                c.CustomerID,
                c.FirstName,
                c.LastName,
                a.Balance AS AccountBalance,
                l.Amount AS RemainingLoan
             FROM Payments p
             LEFT JOIN Loans l ON p.LoanID = l.LoanID
             LEFT JOIN Customers c ON l.CustomerID = c.CustomerID
             LEFT JOIN Accounts a ON c.CustomerID = a.CustomerID
             WHERE p.PaymentID = ?`,
            [PaymentID]  // Fetching details of the specific payment
        );

        res.status(201).send({
            success: true,
            message: "Payment successfully recorded.",
            paymentDetails: {
                PaymentID,
                LoanID,
                Amount,
                PaymentMethod,
                PaymentDate: new Date().toISOString().split('T')[0],
            },
            loanStatus,
            updatedCustomerDetails: updatedDetails[0], // Updated account and loan information
        });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {  // Make sure headers are not already sent
            res.status(500).send({
                success: false,
                message: "Error creating payment.",
                error: error.message || error,
            });
        }
    }
};



//getall Payments
const getAllPayments = async (req, res) => {
    try {
        // Query to fetch all payments with related details
        const [payments] = await db.execute(`
  SELECT 
    p.PaymentID,
    p.LoanID,
    p.Amount AS PaymentAmount,
    p.PaymentDate,
    p.PaymentMethod,
    c.CustomerID,
    c.FirstName,
    c.LastName,
    l.LoanType,
    l.InterestRate,
    l.LoanDate,
    l.DueDate,
    l.Status
FROM 
    Payments p
JOIN 
    Loans l ON p.LoanID = l.LoanID
JOIN 
    Customers c ON l.CustomerID = c.CustomerID;

        `);

        // Check if any payments exist
        if (payments.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No payments found.",
            });
        }

        // Respond with the list of payments
        res.status(200).send({
            success: true,
            message: "Payments retrieved successfully.",
            payments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving payments.",
            error: error.message || error,
        });
    }
};


//get by customerID
const getPaymentsByCustomerID = async (req, res) => {
    try {
        const { CustomerID } = req.params;

        // Validate CustomerID
        if (!CustomerID) {
            return res.status(400).send({
                success: false,
                message: "CustomerID is required.",
            });
        }

        // Check if CustomerID exists
        const [customer] = await db.execute(`SELECT * FROM Customers WHERE CustomerID = ?`, [CustomerID]);

        if (customer.length === 0) {
            return res.status(404).send({
                success: false,
                message: `CustomerID ${CustomerID} does not exist.`,
            });
        }

        // Query to fetch payments by CustomerID
        const [payments] = await db.execute(`
  SELECT 
    p.PaymentID,
    p.LoanID,
    p.Amount AS PaymentAmount,
    p.PaymentDate,
    p.PaymentMethod,
    c.CustomerID,
    c.FirstName,
    c.LastName,
    l.LoanType,
    l.InterestRate,
    l.LoanDate,
    l.DueDate,
    l.Status
FROM 
    Payments p
JOIN 
    Loans l ON p.LoanID = l.LoanID
JOIN 
    Customers c ON l.CustomerID = c.CustomerID

        
            WHERE c.CustomerID = ?
        `, [CustomerID]);


        console.log(payments)
        // Check if payments exist
        if (payments.length === 0) {
            return res.status(404).send({
                success: false,
                message: `No payments found for CustomerID ${CustomerID}.`,
            });
        }

        // Respond with payments
        res.status(200).send({
            success: true,
            message: `Payments retrieved for CustomerID ${CustomerID}.`,
            payments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving payments.",
            error: error.message || error,
        });
    }
};





module.exports = {
    createPayment,getAllPayments,getPaymentsByCustomerID
    
};