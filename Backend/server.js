import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from "./controllers/employee.controller.js";
import { loginEmployee } from "./controllers/auth.controller.js";
import { authorizeToken, checkRole } from "./middleware/auth.middleware.js";

//configure .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//for logging information
app.use(morgan("dev"));
app.use(express.json());
app.use(cors()); // cors middleware

//creating route
app.get('/', (req,res) => {
    res.status(200)
    .json({message: "Node js"});
});
app.post("/employee", authorizeToken, checkRole,createEmployee)
app.get("/employee", authorizeToken, checkRole, getAllEmployees);
app.get("/employee/:id", getEmployeeById);
app.put("/employee/:id", updateEmployee);
app.delete("/employee/:id", authorizeToken, deleteEmployee);

app.post("/auth", loginEmployee);

// Route to verify Token
app.get("/", authorizeToken, (req, res) => {
    res.status(200).json({message: "Token Verified." });
});

//database connection
mongoose.connect(process.env.MONGOOSE_URL)
.then(() => {
    console.log("Database Connection Done.");
    app.listen(PORT, () => {
    console.log("Server is running at port: ", PORT);
});
})
.catch((err) => {
    console.log("Database Connection Failed.", err);
});

