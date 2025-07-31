import employeeModel from "../models/employee.model.js";
import bcrypt from "bcrypt";

export async function createEmployee(req, res) {
    try {

        //1. Extract the data 
        const { name, email, designation, department, salary, password, userType } = req.body;

        //2. validate the data such as email, password, name and all
        if (
            !name ||
            !email ||
            !designation ||
            !department ||
            !salary ||
            !password ||
            !userType) {
            return res.status(400).json({ message: "All the fields are required!" });
        }

        //3. check if email already exist in database
        const isEmailExist = employeeModel.findOne({ email });

        if (!isEmailExist) {
            return res.status(400).json({ message: "Email already exists." })
        };
        const hashedPassword = await bcrypt.hash(password, 10);

        //4. store the data in db
        const employeeData = await employeeModel.create({
            name,
            email,
            designation,
            department,
            salary,
            userType,
            password: hashedPassword,
        })

        //5. send successful message
        res.status(200).json({ message: "User created successfully", data: employeeData });
    }
    catch (error) {
        //If any error occurs send response of error
        console.log("Error:", error);
        res.status(500).json({ message: "Internal server Error" });
    }
}

//function to get all employees
export async function getAllEmployees(req, res) {
    try {
        const allEmployee = await employeeModel.find();

        if (allEmployee.length === 0) {
            return res.status(404).json({ message: "No employee record found." });
        }
        res.status(200).json({ message: "Data found.", data: allEmployee })

    } catch (error) {
        console.log("Error while getting employee data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//function to get employee by id
export async function getEmployeeById(req, res) {
    try {
        // 1. Extract employee ID from request parameters (req.params.id).
        const id = req.params.id;

        // 2. Use EmployeeModel. findById(id) to get the record.
        const employee = await employeeModel.findById(id);

        // 3. If not found, return 404 with a message.
        if (!employee) {
            return res.status(400).json({ message: "Employee not found." });
        }

        // 4. If found, return the employee data with status 200.
        res.status(200).json({ message: "Employee data found.", data: employee });

    } catch (error) {
        console.log("Error while getting employee by Id:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

//function to update employee data
export async function updateEmployee(req, res) {
    try {
        let hashedPassword;
        //1. kun employee ko data update
        const id = req.params.id;

        //2. k k data update
        const { name, email, designation, department, salary, userType, password } = req.body;
        if (password){
            hashedPassword =await bcrypt.hash(password, 10);
        }

        //3. update data
        const updatedEmployee = await employeeModel.findByIdAndUpdate(id,
            { name, email, designation, department, salary, userType, password: hashedPassword },
            { new: true }
        );

        //4. send message
        res.status(200).json({ message: "Employee Data Updated.", data: updatedEmployee });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern?.email) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: "Internal server error" });

    }

}
export async function deleteEmployee(req, res){
    try {
        //1. kun employee ko delete gane id chaiyo
        const id = req.params.id;

        //2. delete employee
        const deleteEmployee = await employeeModel.findByIdAndDelete(id);

        if(!deleteEmployee) {
            return res.sttatus(404).json({message: "Employee to be deleted not found"});
        }
        res.status(200).json({message: "Employee Data Deleted.", data: deleteEmployee});
    } catch (error) {
        console.log("Error while deleting Employee:", error);
        res.status(500).json({message:"Internal server error"});
    }
}