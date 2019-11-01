import db from '../config/database';
import { Model, DataTypes } from 'sequelize';

export class Contact extends Model {
  public idContact!: number;
  public name!: string;
  public email!: string;
  public position!: string;
}

Contact.init(
  {
    idContact: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.TEXT
    },
    position: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: 'Contact',
    timestamps: false,
    freezeTableName: true,
    sequelize: db
  }
);

