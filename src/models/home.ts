import db from '../config/database';
import { Model, DataTypes } from 'sequelize';

export class Home extends Model {
  public idHome!: number;
  public title!: string;
  public content!: string;
  public media!: string;
}

Home.init(
  {
    idHome: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT
    },
    content: {
      type: DataTypes.TEXT
    },
    media: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: 'Home',
    timestamps: false,
    freezeTableName: true,
    sequelize: db
  }
);

