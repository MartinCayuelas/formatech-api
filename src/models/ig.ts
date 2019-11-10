import db from '../config/database';
import { Model, DataTypes } from 'sequelize';

class Ig extends Model {
  public idIg!: number;
  public title!: string;
  public content!: string;
  public media!: string;
}

Ig.init(
  {
    idIg: {
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
    tableName: 'Ig',
    timestamps: false,
    freezeTableName: true,
    sequelize: db
  }
);

export = Ig;
