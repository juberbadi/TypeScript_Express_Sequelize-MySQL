"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExampleData = exports.getExample = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const ExampleSchema = require("../model/Example").ExampleSchema;
const getExample = async (req, res, next) => {
    try {
        const records = await ExampleSchema.findAll({});
        return res.json(records);
        console.log(records);
    }
    catch (e) {
        return res.json({ msg: "fail to read", status: 500 });
    }
};
exports.getExample = getExample;
const getExampleData = async (req, res, next) => {
    const { name, id } = req.body;
    try {
        const example = await ExampleSchema.findOne({ where: { name } });
        if (example)
            return next((0, http_errors_1.default)(406, "example already exists"));
        // const newExample = new Example({ name, id });
        const record = await ExampleSchema.create({ ...req.body });
        res.status(200).json({ name, id });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError);
    }
};
exports.getExampleData = getExampleData;
