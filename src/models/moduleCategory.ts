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
  { idmodule: 206 , category: 'Traitement de données' },
  { idmodule: 1095 , category: 'SI' },
  { idmodule: 1100 , category: 'Dev' },
  { idmodule: 1106 , category: 'Exploitation' },
  { idmodule: 1111 , category: 'Pro' },
  { idmodule: 1114 , category: 'Pro' },
  { idmodule: 1120 , category: 'Exploitation' },
  { idmodule: 1125 , category: 'Dev' },
  { idmodule: 1129 , category: 'Ops' },
  { idmodule: 1134 , category: 'Pro' },
  { idmodule: 1137 , category: 'Pro' },
  { idmodule: 1145 , category: 'Data' },
  { idmodule: 1150 , category: 'Dev' },
  { idmodule: 1154 , category: 'Ops' },
  { idmodule: 1160 , category: 'Pro' },
  { idmodule: 1163 , category: 'Pro' },
  { idmodule: 1169 , category: 'Data' },
  { idmodule: 1174 , category: 'Dev' },
  { idmodule: 1177 , category: 'Ops' },
  { idmodule: 1181 , category: 'Pro' },
  { idmodule: 1184 , category: 'Pro' },
  { idmodule: 1192 , category: 'Exploitation' },
  { idmodule: 1198 , category: 'Sécurité' },
  { idmodule: 1204 , category: 'Ops' },
  { idmodule: 1209 , category: 'Pro' },
  { idmodule: 1212 , category: 'Pro' },
  { idmodule: 1219 , category: 'IA' },
  { idmodule: 1222 , category: 'Dev' },
  { idmodule: 1226 , category: 'Ops' },
  { idmodule: 1230 , category: 'Pro' },
  { idmodule: 1233 , category: 'Pro' },
]);

export = moduleCategory;
