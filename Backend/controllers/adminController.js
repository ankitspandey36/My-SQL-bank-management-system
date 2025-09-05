const db = require("../config/db");

const bcrypt = require('bcrypt');

const createAdmin = async (req, res) => {
    const { Username, Password, EmployeeID } = req.body;

    try {
        // Validate required fields
        if (!Username || !Password || !EmployeeID) {
            return res.status(400).send({
                success: false,
                message: "Username, Password, and EmployeeID are required.",
            });
        }

        // Check if EmployeeID exists
        const [employeeRows] = await db.execute(
            "SELECT 1 FROM Employees WHERE EmployeeID = ? LIMIT 1",
            [EmployeeID]
        );

        if (employeeRows.length === 0) {
            return res.status(400).send({
                success: false,
                message: "EmployeeID does not exist.",
            });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt rounds

        // Insert admin into the Admin table
        const [result] = await db.execute(
            "INSERT INTO Admin (Username, Password, EmployeeID) VALUES (?, ?, ?)",
            [Username, hashedPassword, EmployeeID]
        );

        res.status(201).send({
            success: true,
            message: "Admin created successfully",
            data: { AdminID: result.insertId, Username, EmployeeID },
        });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).send({
            success: false,
            message: "Error creating admin",
            error,
        });
    }
};

//create customer




//login
const loginAdmin = async (req, res) => {
    try {
        const { Username, Password } = req.body;

        

        // Using .execute() for security
        const [admin] = await db.execute("SELECT * FROM Admin WHERE Username = ?", [Username]);

        if (admin.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Invalid Username or Password",
            });
        }

        const isMatch = await bcrypt.compare(Password, admin[0].Password);

        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid Username or Password",
            });
        }

        res.status(200).send({
            success: true,
            message: "Login successful",
            data: {
                AdminID: admin[0].AdminID,
                Username: admin[0].Username,
                EmployeeID: admin[0].EmployeeID,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error logging in",
            error,
        });
    }
};

// Reset or upgrade admin password
const resetPassword = async (req, res) => {
    try {
        const { Username, AdminID, EmployeeID, NewPassword } = req.body;

        // Validate required fields
        if (!Username || !AdminID || !EmployeeID || !NewPassword) {
            return res.status(400).send({
                success: false,
                message: "Username, AdminID, EmployeeID, and NewPassword are required",
            });
        }

        // Check if the admin exists with the provided details
        const [admin] = await db.execute(
            `SELECT * FROM Admin WHERE Username = ? AND AdminID = ? AND EmployeeID = ?`,
            [Username, AdminID, EmployeeID]
        );

        if (!admin || admin.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Admin not found with the provided details",
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(NewPassword, 10);

        // Update the password in the database
        await db.execute(
            `UPDATE Admin SET Password = ? WHERE Username = ? AND AdminID = ? AND EmployeeID = ?`,
            [hashedPassword, Username, AdminID, EmployeeID]
        );

        // Respond with success
        res.status(200).send({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error updating password",
            error,
        });
    }
};



module.exports={createAdmin,loginAdmin,resetPassword}