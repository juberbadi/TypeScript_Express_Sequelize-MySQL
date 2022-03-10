"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../config/index"));
const EmployeeSchema = require("./Employee").EmployeeSchema;
class UserSchema extends sequelize_1.Model {
}
exports.UserSchema = UserSchema;
UserSchema.init({
    name: { type: sequelize_1.DataTypes.STRING },
    email: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING },
    isUserVerified: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    verifyToken: { type: sequelize_1.DataTypes.STRING }
}, {
    sequelize: index_1.default,
    modelName: 'user',
});
// One to Many relationship
UserSchema.hasMany(EmployeeSchema, { sourceKey: 'id', foreignKey: 'userId' });
EmployeeSchema.belongsTo(UserSchema, { targetKey: 'id' });
//One to One relationship
// UserSchema.hasOne(EmployeeSchema,{sourceKey: 'id', foreignKey: 'userId'});
// EmployeeSchema.belongsTo(UserSchema, {targetKey: 'id'});
//Many to Many relationship
// UserSchema.belongsToMany(EmployeeSchema, { through: 'Example' });
// EmployeeSchema.belongsToMany(UserSchema, { through: 'Example' });
// db.sync({alter: true}).then(() => {
//
// }).catch(err => {
//   console.log(err);
// })
