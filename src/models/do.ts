import db from '../config/database';
import { Model, DataTypes } from 'sequelize';

class Do extends Model {
  public idDo!: number;
  public title!: string;
  public content!: string;
  public media!: string;
}

Do.init(
  {
    idDo: {
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
    tableName: 'Do',
    timestamps: false,
    freezeTableName: true,
    sequelize: db
  }
);

export = Do;