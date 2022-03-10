import { Router } from "express";
import { createEmployeeData, getEmployees, getEmployee, updateEmployee, deleteEmployee } from "../controllers/employeeController";
import { authChecker } from '../middleware/authChecker';

const router = Router();

router.post("/create-employee", authChecker, createEmployeeData);
router.get("/get-employees", authChecker, getEmployees);
router.get("/get-employee/:id", authChecker, getEmployee);
router.put("/update-employee/:id", authChecker, updateEmployee);
router.delete("/delete-employee/:id", authChecker, deleteEmployee);

export default router;
