"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.deleteEmployee = exports.getEmployee = exports.getEmployees = exports.createEmployeeData = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const EmployeeSchema = require("../model/Employee").EmployeeSchema;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createEmployeeData = async (req, res, next) => {
    const { name, email, position, office, salary } = req.body;
    const token = req.cookies.jwt;
    const { userId } = jsonwebtoken_1.default.verify(token, "codingwithjbr");
    console.log(userId);
    // const userId = 1;
    // const data = JSON.stringify(decoded);
    // console.log(data[name]);
    // var userId = data.name;
    // console.log(decoded.userId)
    try {
        const employee = await EmployeeSchema.findOne({ where: { email } });
        if (employee)
            return next((0, http_errors_1.default)(406, "employee already exists"));
        // const newEmployee = new Employee({ name, email, position, office, salary });
        const record = await EmployeeSchema.create({ ...req.body, userId: userId });
        // await record.save();
        res.status(201).json({ name, email, position, office, salary, userId });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.createEmployeeData = createEmployeeData;
const getEmployees = async (req, res, next) => {
    try {
        const employee = await EmployeeSchema.findAll({});
        res.status(200).json({ employee });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.getEmployees = getEmployees;
const getEmployee = async (req, res, next) => {
    const id = req.params.id;
    try {
        const employee = await EmployeeSchema.findOne({ where: { id } });
        res.status(200).json({ employee });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.getEmployee = getEmployee;
const deleteEmployee = async (req, res, next) => {
    const id = req.params.id;
    try {
        const employee = await EmployeeSchema.destroy({ where: { id } });
        console.log(employee);
        if (employee == 0)
            return next((0, http_errors_1.default)(406, "employee not found"));
        res.status(201).json({ message: 'Employee deleted successfully' });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.deleteEmployee = deleteEmployee;
const updateEmployee = async (req, res, next) => {
    const { name, email, position, office, salary } = req.body;
    const id = req.params.id;
    try {
        const record = await EmployeeSchema.findOne({ where: { id } });
        if (!record) {
            return res.json({ msg: "Can not find existing record" });
        }
        const employee = await record.update({ ...req.body }, { where: { id } });
        res.status(201).json({ message: 'Updated Successfully', employee });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.updateEmployee = updateEmployee;
