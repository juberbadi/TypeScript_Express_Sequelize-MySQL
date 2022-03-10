import { DataTypes, Model } from 'sequelize';
import db from '../config/index';

interface IExample {
  id: string;
  name: string;
}

export class ExampleSchema extends Model<IExample> {}

ExampleSchema.init(
	{
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull:false,
      primaryKey:true,
    },
    name: { type: DataTypes.STRING },
  },
	{
		sequelize: db,
		modelName: 'example',
	});
