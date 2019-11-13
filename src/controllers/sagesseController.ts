const { Sequelize, QueryTypes } = require('sequelize');
const db = new Sequelize(process.env.SAGESSE_DATABASE_NAME!, process.env.SAGESSE_USER!, process.env.SAGESSE_PASSWORD!, {host: process.env.SAGESSE_HOST!, port: process.env.SAGESSE_PORT!, dialect: 'postgres', native: true, quoteIdentifiers: true});
import moduleCategory from '../models/moduleCategory';
//import { db } from '../config/sagesse_database';



export const testConnexion = async () => {
  console.log('BEGIN authentification');
  db.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      return 'SUCCES';
    })
    .catch((error: any)=>{
      console.log('Connexion FAILED : '+error);
    });
};



export const getFormationDetails = async (nomFormation : string) => {
  console.log('BEGIN of get formation');

  let formationInfo = await db.query('SELECT * FROM sagesse.parcours p WHERE p."codParcours" = :codP ; ', { replacements: {codP:nomFormation}, type: QueryTypes.SELECT});

  if (formationInfo.length == 0){
    throw TypeError('Formation not found');
  }

  let formationDetails = {
    'id': formationInfo[0].idParcours ,
    'code': formationInfo[0].codParcours ,
    'title': formationInfo[0].licParcours ,
    'description':formationInfo[0].descParcours ,
    'steps': [] as any
  };

  let steps = await db.query('SELECT * FROM sagesse.elps p WHERE p."idParcours" = :idP AND p."natElp"= :etape ; ', {replacements: {idP:formationDetails.id ,etape:'étape'}, type: QueryTypes.SELECT});

  steps.forEach((step: any) => {
    let stepInfo = {
      'id': step.idElp ,
      'code': step.codElp,
      'title': step.licElp,
      'credit': step.nbCrdElp
    };
    formationDetails.steps.push(stepInfo);
  });

  return formationDetails;
};




export const getStepDetails = async (idStep : number) => {
  console.log('BEGIN get step '+idStep);

  let stepValues = await db.query( 'SELECT * FROM syllabus.syl_elps s WHERE s."idElp" = :idStep ; ',{replacements: {idStep:idStep}, type: QueryTypes.SELECT });

  if (stepValues.length == 0){
    throw TypeError('Annee not found');
  }

  let periods = await db.query('SELECT * FROM sagesse.elps e WHERE e."natElp" = :type AND e."idElp" IN (SELECT DISTINCT f."idPeriode" FROM sagesse.flat_elps f WHERE f."idEtape" = :idStep ) ; ',{replacements: {idStep:idStep, type:'période'}, type: QueryTypes.SELECT });

  //let duree = await db.query('SELECT * FROM syllabus.durees d WHERE d."idDuree" = :idDuree ;',{replacements: {idDuree:stepValues[0].idDuree}, type: QueryTypes.SELECT});

  let stepDetails = {
    'id': stepValues[0].idElp ,
    'title': stepValues[0].licElp,
    'description': stepValues[0].descriptionElp,
    'context':  stepValues[0].contexteElp,
    'content':  stepValues[0].contenuElp,
    /*'cm': duree[0].hCM,
    'cmtd': duree[0].hCMTD,
    'td': duree[0].hTD,
    'tp': duree[0].hTP,
    'terrain': duree[0].hTerrain,
    'projet': duree[0].hProjet,*/
    'periods':[] as any
  };

  periods.forEach((period: any) => {
    stepDetails.periods.push({
      'id': period.idElp ,
      'code': period.codElp,
      'title': period.licElp,
      'credit': period.nbCrdElp
    });
  });
  return stepDetails;
};


export const getModuleFromStep = async (idStep : number) => {
  console.log('BEGIN get module from step '+idStep);

  let stepValues = await db.query( 'SELECT * FROM syllabus.syl_elps s WHERE s."idElp" = :idStep ; ',{replacements: {idStep:idStep}, type: QueryTypes.SELECT });

  if (stepValues.length == 0){
    throw TypeError('Annee not found');
  }

  let periods = await db.query('SELECT * FROM sagesse.elps e WHERE e."natElp" = :type AND e."idElp" IN (SELECT DISTINCT f."idPeriode" FROM sagesse.flat_elps f WHERE f."idEtape" = :idStep ) ; ',{replacements: {idStep:idStep, type:'période'}, type: QueryTypes.SELECT });
  //let duree = await db.query('SELECT * FROM syllabus.durees d WHERE d."idDuree" = :idDuree ;',{replacements: {idDuree:stepValues[0].idDuree}, type: QueryTypes.SELECT});

  let stepDetails = {
    'id': stepValues[0].idElp ,
    'title': stepValues[0].licElp,
    'description': stepValues[0].descriptionElp,
    'context':  stepValues[0].contexteElp,
    'content':  stepValues[0].contenuElp,
    /*'cm': duree[0].hCM,
    'cmtd': duree[0].hCMTD,
    'td': duree[0].hTD,
    'tp': duree[0].hTP,
    'terrain': duree[0].hTerrain,
    'projet': duree[0].hProjet,*/
    'periods':[] as any
  };

  let i= 0;
  for (const period of periods){
    let modules = await db.query('SELECT * FROM sagesse.elps e WHERE e."natElp" = :type AND e."idElp" IN (SELECT DISTINCT f."idModule" FROM sagesse.flat_elps f WHERE f."idPeriode" = :id ) ; ', {replacements: {id:period.idElp, type:'module'}, type: QueryTypes.SELECT });

    let categoryArray = [];
    for (const module of modules){
      let moduleWithCategory = module;
      let cat = await moduleCategory.findAll({
        attributes: ['category'],
        where: {idmodule: module.idElp}
      });
      if (typeof cat==='undefined' || typeof cat[0]==='undefined'){
        moduleWithCategory.category = 'this UE doesn\'t have a category for the moment';
      }
      else{
        moduleWithCategory.category = cat[0].category;
      }
      categoryArray.push(moduleWithCategory);
    }

    stepDetails.periods.push({
      'id': period.idElp ,
      'code': period.codElp,
      'title': period.licElp,
      'credit': period.nbCrdElp,
      'modules': [] as any
    });

    modules.forEach((module: any) => {
      stepDetails.periods[i].modules.push({
        'id': module.idElp ,
        'code': module.codElp,
        'title': module.licElp,
        'credit': module.nbCrdElp,
        'category': module.category,
      });
    });
    i = i+1;
  }
  return stepDetails;
};




export const getPeriodDetails = async (idPeriod: number) => {
  console.log('BEGIN get period '+idPeriod);

  let periodValues = await db.query( 'SELECT * FROM syllabus.syl_elps s WHERE s."idElp" = :id ; ', {replacements: {id:idPeriod}, type: QueryTypes.SELECT });

  if (periodValues.length == 0){
    throw TypeError('Semestre not found');
  }

  let periodDetails = {
    'id': periodValues[0].idElp ,
    'title': periodValues[0].licElp,
    'description': periodValues[0].descriptionElp,
    'context':  periodValues[0].contexteElp,
    'content':  periodValues[0].contenuElp,
    'modules':[] as any
  };

  let modules = await db.query('SELECT * FROM sagesse.elps e WHERE e."natElp" = :type AND e."idElp" IN (SELECT DISTINCT f."idModule" FROM sagesse.flat_elps f WHERE f."idPeriode" = :id ) ; ', {replacements: {id:idPeriod, type:'module'}, type: QueryTypes.SELECT });

  modules.forEach((module: any) => {
    periodDetails.modules.push({
      'id': module.idElp ,
      'code': module.codElp,
      'title': module.licElp,
      'credit': module.nbCrdElp
    });
  });
  return periodDetails;
};






export const getModuleDetails = async (idModule: number) => {
  console.log('BEGIN get step '+idModule);

  let moduleValues = await db.query( 'SELECT * FROM syllabus.syl_elps s WHERE s."idElp" = :id ; ', {replacements: {id:idModule}, type: QueryTypes.SELECT });
  if (moduleValues.length == 0){
    throw TypeError('Module not found');
  }

  let subjects = await db.query('SELECT * FROM sagesse.elps e WHERE e."natElp" = :type AND e."idElp" IN (SELECT DISTINCT f."idMatiere" FROM sagesse.flat_elps f WHERE f."idModule" = :id ) ; ', {replacements: {id:idModule, type:'matière'}, type: QueryTypes.SELECT });
  let idParent = await db.query('SELECT f."idPeriode", f."idEtape" FROM sagesse.flat_elps f WHERE f."idModule" = :id', {replacements: {id:idModule}, type: QueryTypes.SELECT });

  let cat : moduleCategory[] = await moduleCategory.findAll({
    attributes: ['category'],
    where: {idmodule: idModule}
  });

  let category : string = '';
  if (typeof cat==='undefined' || typeof cat[0]==='undefined'){
    category = 'this UE doesn\'t have a category for the moment';
  }
  else{
    category = cat[0].category;
  }

  let moduleDetails : any ;

  if(moduleValues[0].idDuree!=null){
    let duree = await db.query('SELECT * FROM syllabus.durees d WHERE d."idDuree" = :idDuree ;',{replacements: {idDuree:moduleValues[0].idDuree}, type: QueryTypes.SELECT});
    moduleDetails = {
      'id': moduleValues[0].idElp ,
      'title': moduleValues[0].licElp,
      'description': moduleValues[0].descriptionElp,
      'context':  moduleValues[0].contexteElp,
      'content':  moduleValues[0].contenuElp,
      'idParentStep': idParent[0].idEtape,
      'idParentSemester': idParent[0].idPeriode,
      'category': category,
      'cm': duree[0].hCM,
      'cmtd': duree[0].hCMTD,
      'td': duree[0].hTD,
      'tp': duree[0].hTP,
      'terrain': duree[0].hTerrain,
      'projet': duree[0].hProjet,
      'subjects':[] as any
    };
  }
  else{
    moduleDetails = {
      'id': moduleValues[0].idElp ,
      'title': moduleValues[0].licElp,
      'description': moduleValues[0].descriptionElp,
      'context':  moduleValues[0].contexteElp,
      'content':  moduleValues[0].contenuElp,
      'idParentStep': idParent[0].idEtape,
      'idParentSemester': idParent[0].idPeriode,
      'category': category,
      'subjects':[] as any
    };
  }

  subjects.forEach((subject: any) => {
    moduleDetails.subjects.push({
      'id': subject.idElp ,
      'code': subject.codElp ,
      'title': subject.licElp ,
      'credit': subject.nbCrdElp
    });
  });
  return moduleDetails;
};





export const getSubjectDetails = async (idSubject: number) => {
  console.log('BEGIN get step '+idSubject);
  let subjectValues = await db.query('SELECT * FROM syllabus.syl_elps s WHERE s."idElp" = :id ; ',{replacements: {id:idSubject}, type: QueryTypes.SELECT });

  if (subjectValues.length == 0){
    throw TypeError('Matière not found');
  }

  let subjectDetails = {
    'id': subjectValues[0].idElp ,
    'title': subjectValues[0].licElp,
    'description': subjectValues[0].descriptionElp,
    'context':  subjectValues[0].contexteElp,
    'content':  subjectValues[0].contenuElp
  };
  return subjectDetails;
};
