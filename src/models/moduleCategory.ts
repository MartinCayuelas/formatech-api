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
      type: DataTypes.ENUM('Gestion de projet', 'Traitement de données', 'Gestion et communication', 'Langues et communication', 'Logique et algorithmie', 'Systèmes d information', 'Techniques de l ingénieur', 'Data science')
    }
  },
  {
    tableName: 'modulecategory',
    timestamps: false,
    freezeTableName: true,
    sequelize: db
  }
);


moduleCategory.bulkCreate([
  { idmodule: 185 , category: 'Logique et algorithmie' },
  { idmodule: 186 , category: 'Logique et algorithmie' },
  { idmodule: 187 , category: 'Gestion et communication' },
  { idmodule: 188 , category: 'Techniques de l ingénieur' },
  { idmodule: 189 , category: 'Logique et algorithmie' },
  { idmodule: 190 , category: 'Techniques de l ingénieur' },
  { idmodule: 191 , category: 'Gestion et communication' },
  { idmodule: 192 , category: 'Langues et communication' },
  { idmodule: 194 , category: 'Logique et algorithmie' },
  { idmodule: 195 , category: 'Traitement de données' },
  { idmodule: 196 , category: 'Gestion et communication' },
  { idmodule: 197 , category: 'Data science' },
  { idmodule: 198 , category: 'Techniques de l ingénieur' },
  { idmodule: 199 , category: 'Gestion de projet' },
  { idmodule: 200 , category: 'Langues et communication' },
  { idmodule: 201 , category: 'Gestion de projet' },
  { idmodule: 202 , category: 'Systèmes d information' },
  { idmodule: 203 , category: 'Traitement de données' },
  { idmodule: 204 , category: 'Gestion et communication' },
  { idmodule: 205 , category: 'Systèmes d information' },
  { idmodule: 204 , category: 'Gestion et communication' },
  { idmodule: 205 , category: 'Systèmes d information' },
  { idmodule: 205 , category: 'Traitement de données' },
]);

export = moduleCategory;
