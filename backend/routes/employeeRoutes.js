import express from "express";
import multer from "multer";
import { getAllEmployees, postEmployeeData } from "../controllers/employeeController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const employeeRouter = express.Router();

// employeeRouter.get('getEmployees', getAllEmployees);
employeeRouter.get('/data', getAllEmployees);
employeeRouter.post('/upload', upload.single('file'), postEmployeeData);

export default employeeRouter;