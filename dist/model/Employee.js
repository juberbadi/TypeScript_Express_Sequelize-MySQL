"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSchema = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../config/index"));
class EmployeeSchema extends sequelize_1.Model {
}
exports.EmployeeSchema = EmployeeSchema;
EmployeeSchema.init({
    name: { type: sequelize_1.DataTypes.STRING },
    email: { type: sequelize_1.DataTypes.STRING },
    position: { type: sequelize_1.DataTypes.STRING },
    office: { type: sequelize_1.DataTypes.STRING },
    salary: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: index_1.default,
    modelName: 'employee',
});
