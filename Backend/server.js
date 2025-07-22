import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createEmployee, getAllEmployees, getEmployeeById } from "./controllers/employee.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//for logging information
app.use(morgan("dev"));
app.use(express.json());

//creating route
app.get('/', (req,res) => {
    res.status(200)
    .json({message: "Node js"});
});
app.post("/employee/create", createEmployee)
app.get("/employee/getAllEmployee", getAllEmployees)
app.get("/employee/getAllEmployee/:id", getEmployeeById);

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

