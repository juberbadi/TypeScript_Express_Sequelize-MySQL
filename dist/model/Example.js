"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleSchema = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../config/index"));
class ExampleSchema extends sequelize_1.Model {
}
exports.ExampleSchema = ExampleSchema;
ExampleSchema.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: index_1.default,
    modelName: 'example',
});
