import db from '../config/database';
import { Model, DataTypes } from 'sequelize';

export class User extends Model {
  public idUser!: number;
  public login!: string;
  public password!: string;
}

User.init(
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: 'User',
    timestamps: false,
    freezeTableName: true,
    sequelize: db
  }
);

