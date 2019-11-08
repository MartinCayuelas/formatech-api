import { Request, Response } from 'express';
const { Sequelize, QueryTypes } = require('sequelize');
//import db from '../config/sagesse_database';

//const db = new Sequelize('postgres://consultation:adobe29;borines@sagesse.polytech.umontpellier.fr:5432/sagesse20&ssl=true');
const db = new Sequelize('sagesse20', 'consultation', 'adobe29;borines', {host: 'sagesse.polytech.umontpellier.fr',
                                                                          port: 5432,
                                                                          dialect: 'postgres',
                                                                          //ssl: true,
                                                                          native: false,
                                                                        });

export const testConnexion = async () => {
  console.log("BEGIN authentification");
  db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return 'SUCCES';
  })
  .catch((error: any)=>{
    console.log('Connexion FAILED : '+error);
  })
};


export const getFormationDetails = async (nomFormation : string) => {
  console.log("BEGIN get formation");

  let formInfo = await db.query("SELECT * \
                                 FROM parcours ; "
                                , { type: QueryTypes.SELECT});

  let formPeriod = await db.query("SELECT e.idElp e.codElp e.licElp   \
                                   FROM elps e JOIN anneeus a ON e.idAnnee = a.idAnnee \
                                   WHERE e.natElp = 'etape' \
                                      AND e.codParcours = :codP \
                                      AND a.anDebut = 2019 \; "
                                   ,{replacements: {codP:nomFormation},
                                      type: QueryTypes.SELECT });

  return 'WE GET FORMATION DETAILS';

};



export const getStepDetails = async (req: Request, res: Response) => {
  console.log("BEGIN get step");

  db.query("SELECT s.licElp s.descriptionElp s.contexteElp s.contenuElp \
            FROM syl_elps s \
            WHERE s.idElp = :idStep ; "
            ,{replacements: {idStep:req.params.id},
              type: QueryTypes.SELECT })
  .then( (step: any) => {
      console.log(step);
      db.query("SELECT e.idElp e.codElp e.licElp   \
                FROM elps e JOIN anneeus a ON e.idAnnee = a.idAnnee \
                            JOIN flat_elps f ON e.idElp = f.idPeriode \
                WHERE e.natElp = 'periode' \
                  AND f.idEtape = :idStep \
                  AND a.anDebut = 2019 \; "
                ,{replacements: {idStep:req.params.id},
                  type: QueryTypes.SELECT })
  })
  .then( (periods: any) => {
    console.log(periods);
  })
};


export const getPeriodDetails = async (req: Request, res: Response) => {
  console.log("BEGIN get period");

  db.query("SELECT s.licElp s.descriptionElp s.contexteElp s.contenuElp \
            FROM syl_elps s \
            WHERE s.idElp = :idPeriod ; "
            ,{replacements: {idPeriod:req.params.id},
              type: QueryTypes.SELECT })
  .then( (period: any) => {
      console.log(period);
      db.query("SELECT e.idElp e.codElp e.licElp   \
                FROM elps e JOIN anneeus a ON e.idAnnee = a.idAnnee \
                            JOIN flat_elps f ON e.idElp = f.idPeriode \
                WHERE e.natElp = 'periode' \
                  AND f.idPeriode = :idPeriod \
                  AND a.anDebut = 2019 \; "
                ,{replacements: {idPeriod:req.params.id},
                  type: QueryTypes.SELECT })
  })
  .then( (periods: any) => {
    console.log(periods);
  })
};


export const getModuleDetails = async (req: Request, res: Response) => {

};


export const getSubjectDetails = async (req: Request, res: Response) => {

};
