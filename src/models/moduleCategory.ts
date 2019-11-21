import db from '../config/database';
import { Model, DataTypes } from 'sequelize';

class moduleCategory extends Model {
  public idmodule!: number;
  public category!: string;
}

moduleCategory.init(
  {
    idmodule: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.ENUM('IA','Data','Sécurité','Ops','Pro','Exploitation','Dev','SI','Gestion de projet', 'Traitement de données', 'Gestion et communication', 'Langues et communication', 'Logique et algorithmie', 'Systèmes d information', 'Techniques de l ingénieur', 'Data science')
    }
  },
  {
    tableName: 'modulecategory',
    timestamps: false,
    freezeTableName: true,
    sequelize: db
  }
);



export = moduleCategory;
