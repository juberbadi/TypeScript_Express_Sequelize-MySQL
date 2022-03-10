import { Router } from "express";
import { getExample, getExampleData } from "../controllers/exampleControllers";
import { getExampleDataValidation } from "../validation/exampleValidation/exampleValidation";
import { authChecker } from '../middleware/authChecker';

const router = Router();

router.get("/", authChecker, getExample);
router.post("/", authChecker, getExampleDataValidation, getExampleData);

export default router;
