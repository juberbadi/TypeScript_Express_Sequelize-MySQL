import { DataTypes, Model } from 'sequelize';
import db from '../config/index';
const EmployeeSchema = require("./Employee").EmployeeSchema;

interface IUser {
  name: string;
  email: string;
  password: string;
  isUserVerified: boolean;
  verifyToken: string;
}

export class UserSchema extends Model<IUser> {}

UserSchema.init(
	{
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    isUserVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verifyToken: { type: DataTypes.STRING }
  },
	{
		sequelize: db,
		modelName: 'user',
	});

// One to Many relationship
UserSchema.hasMany(EmployeeSchema,{sourceKey: 'id', foreignKey: 'userId'});
EmployeeSchema.belongsTo(UserSchema, {targetKey: 'id'});

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
