import { RequestHandler } from "express";
import createHttpError from "http-errors";
const EmployeeSchema = require("../model/Employee").EmployeeSchema;
import jwt from 'jsonwebtoken';

export const createEmployeeData: RequestHandler = async (req, res, next) => {
  const { name, email, position, office, salary } = req.body;

  interface JwtPayload {
    userId: string
  }
  const token = req.cookies.jwt;
  const {userId} = jwt.verify(token, "codingwithjbr") as JwtPayload;

  console.log(userId);
  // const userId = 1;
  // const data = JSON.stringify(decoded);
  // console.log(data[name]);

  // var userId = data.name;
  // console.log(decoded.userId)
  try {
    const employee = await EmployeeSchema.findOne({ where: { email } });

    if (employee) return next(createHttpError(406, "employee already exists"));

    // const newEmployee = new Employee({ name, email, position, office, salary });
    const record = await EmployeeSchema.create({ ...req.body, userId: userId });

    // await record.save();

    res.status(201).json({ name, email, position, office, salary,userId });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const getEmployees: RequestHandler = async (req, res, next) => {
  try {
    const employee = await EmployeeSchema.findAll({ });
    res.status(200).json({ employee });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const getEmployee: RequestHandler = async (req, res, next) => {
  const id: string = req.params.id;
  try {
    const employee = await EmployeeSchema.findOne({ where: { id } });
    res.status(200).json({ employee });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const deleteEmployee: RequestHandler = async (req, res, next) => {
  const id: string = req.params.id;
  try {
    const employee = await EmployeeSchema.destroy({ where: { id } });
    console.log(employee);

    if (employee == 0) return next(createHttpError(406, "employee not found"));
    res.status(201).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const updateEmployee: RequestHandler = async (req, res, next) => {
  const { name, email, position, office, salary } = req.body;
  const id: string = req.params.id;
  try {
    const record = await EmployeeSchema.findOne({ where: { id } });
		if (!record) {
			return res.json({ msg: "Can not find existing record" });
		}
    const employee = await record.update({ ...req.body }, { where: { id }});
    res.status(201).json({ message: 'Updated Successfully', employee });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};
