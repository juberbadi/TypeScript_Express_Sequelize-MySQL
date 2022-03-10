import { DataTypes, Model } from 'sequelize';
import db from '../config/index';

interface IEmployee {
  name: string;
  email: string;
  position: string;
  office: string;
  salary: string;
}

export class EmployeeSchema extends Model<IEmployee> {}

EmployeeSchema.init(
	{
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    position: { type: DataTypes.STRING },
    office: { type: DataTypes.STRING },
    salary: { type: DataTypes.STRING },
  },
	{
		sequelize: db,
		modelName: 'employee',
	});
