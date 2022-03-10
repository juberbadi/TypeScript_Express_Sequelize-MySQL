import { RequestHandler } from "express";
import createHttpError from "http-errors";
const ExampleSchema = require("../model/Example").ExampleSchema;

export const getExample: RequestHandler = async (req, res, next) => {
  try {
      const records = await ExampleSchema.findAll({});
      return res.json(records);
      console.log(records);

		} catch (e) {
			return res.json({ msg: "fail to read", status: 500 });
		}
};

export const getExampleData: RequestHandler = async (req, res, next) => {

  const { name, id }: IExampleData = req.body;

  try {
    const example = await ExampleSchema.findOne({ where: {name} });

    if (example) return next(createHttpError(406, "example already exists"));

    // const newExample = new Example({ name, id });
    const record = await ExampleSchema.create({ ...req.body });

    res.status(200).json({ name, id });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};
