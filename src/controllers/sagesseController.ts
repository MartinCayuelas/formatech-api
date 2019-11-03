import { Response } from 'express';
import { JSDOM } from 'jsdom';

import Request from 'request';
import { Response as ResponseReq } from 'request';


export const getSubjectDetails = async (subjectId: string, year: string, res: Response) => {
  Request('https://sagesse.polytech.umontpellier.fr/syllabus/'+subjectId+'/'+year, (error: object, response: ResponseReq, body: string) => {
    if(error) {
      let errorMsg = {'error':'Problem while getting page'};
      res.status(500);
      res.send(errorMsg);
      return console.dir(error);
    }
    const dom = new JSDOM(body);
    let details: object = {};

    try{
      let descripTableNode = dom.window.document.getElementsByClassName('syllabus-elp')[0].querySelector('dl');
      let hourTableNode = descripTableNode!.querySelector('dd')!.querySelector('dl')!.querySelectorAll('dd')[4]!.querySelector('tbody')!.querySelector('tr');

      let personalWork = descripTableNode!.querySelector('dd')!.querySelector('dl')!.querySelectorAll('dd')[3]!.innerHTML;
      let CM = hourTableNode!.querySelectorAll('td')[0]!.textContent;
      let CMTD = hourTableNode!.querySelectorAll('td')[1]!.textContent;
      let TD = hourTableNode!.querySelectorAll('td')[2]!.textContent;
      let TP = hourTableNode!.querySelectorAll('td')[3]!.textContent;
      let terrain = hourTableNode!.querySelectorAll('td')[4]!.textContent;
      let projet = hourTableNode!.querySelectorAll('td')[5]!.textContent;

      let description = descripTableNode!.children[5]!.textContent!.trim();
      let context = descripTableNode!.children[7]!.textContent!.trim();
      let content = descripTableNode!.children[9]!.textContent!.trim();

      details = {
        'personalWork':personalWork ,
        'CM':CM ,
        'TD':TD ,
        'CMTD':CMTD ,
        'TP':TP ,
        'Projet':projet ,
        'Terrain':terrain ,
        'description':description ,
        'context':context ,
        'content':content
      };

      res.type('application/json');
      res.status(200);

    } catch(error){
      console.log('Problem while scrapping HTML (element not found)');
      res.status(200);
      details = {'error':'can\'t get elements'};
    }

    res.send(details); //Send the response
  });
};



export const getModuleDetails = async (moduleId: string, year: string, res: Response) => {
  Request.get('https://sagesse.polytech.umontpellier.fr/syllabus/'+moduleId+'/'+year, (error: object, response: ResponseReq, body: string) => {
    if(error) {
      let errorMsg = {'error':'Problem while getting page'};
      res.status(500);
      res.send(errorMsg);
      return console.dir(error);
    }
    const dom = new JSDOM(body);
    let details: object = {};
    try{
      let descripTableNode = dom.window.document.getElementsByClassName('syllabus-elp')[0].querySelector('dl');
      let hourTableNode = descripTableNode!.querySelector('dd')!.querySelector('dl')!.querySelectorAll('dd')[4]!.querySelector('tbody')!.querySelector('tr');

      let personalWork = descripTableNode!.querySelector('dd')!.querySelector('dl')!.querySelectorAll('dd')[3]!.innerHTML;
      let CM = hourTableNode!.querySelectorAll('td')[0]!.textContent;
      let CMTD = hourTableNode!.querySelectorAll('td')[1]!.textContent;
      let TD = hourTableNode!.querySelectorAll('td')[2]!.textContent;
      let TP = hourTableNode!.querySelectorAll('td')[3]!.textContent;
      let terrain = hourTableNode!.querySelectorAll('td')[4]!.textContent;
      let projet = hourTableNode!.querySelectorAll('td')[5]!.textContent;

      let description = descripTableNode!.children[5]!.textContent!.trim();
      let context = descripTableNode!.children[7]!.textContent!.trim();
      let content = descripTableNode!.children[9]!.textContent!.trim();

      let subjects = Array.from(dom.window.document.getElementsByClassName('listeDescendants')[0].children[1].children).map(subject => {
        let subjectSplit = (subject as Element)!.querySelector('p')!.textContent!.split(':');
        let id = subjectSplit[0].trim();
        let title = subjectSplit[1].trim();
        return {'id':id, 'title':title};
      });

      details = {
        'personalWork':personalWork ,
        'CM':CM ,
        'TD':TD ,
        'CMTD':CMTD ,
        'TP':TP ,
        'Projet':projet ,
        'Terrain':terrain ,
        'description':description ,
        'context':context ,
        'content':content ,
        'subjects':subjects
      };
      res.status(200);

    } catch(error){
      console.log('Problem while scrapping HTML (element not found)');
      details = {'error':'can\'t get elements'};
      res.status(500);
    }

    res.type('application/json');
    res.send(details); //Send the response
  });
};


export const getFormationDetails = async (formationId: string, year: string, res: Response) => {
  Request.get('https://sagesse.polytech.umontpellier.fr/structures/'+formationId+'/'+year, (error: object, response:ResponseReq, body:string) => {
    if(error) {
      let errorMsg = {'error':'Problem while getting page'};
      res.status(500);
      res.send(errorMsg);
      return console.dir(error);
    }
    const dom = new JSDOM(body);

    let years = Array.from(dom.window.document.getElementsByClassName('etape')).map(etape => {
      let etapeId = (etape as Element)!.querySelector('header')!.querySelector('div')!.querySelector('div')!.children[1]!.querySelector('p')!.textContent!.split('-')[0]!.trim();
      return {
        'id':etapeId
      };
    });

    res.type('application/json');
    res.status(200);
    res.send(years); //Send the response
  });
};


export const getSemesterDetails = async (semesterId: string, year: string, res: Response) => {
  Request.get('https://sagesse.polytech.umontpellier.fr/syllabus/'+semesterId+'/'+year, (error: object, response: ResponseReq, body: string) => {
    if(error) {
      let errorMsg = {'error':'Problem while getting page'};
      res.status(500);
      res.send(errorMsg);
      return console.dir(error);
    }
    const dom = new JSDOM(body);

    let details: object = {};

    try{
      let descripTableNode = dom.window.document.getElementsByClassName('syllabus-elp')[0].querySelector('dl');
      let hourTableNode = descripTableNode!.querySelector('dd')!.querySelector('dl')!.querySelectorAll('dd')[4]!.querySelector('tbody')!.querySelector('tr');

      let personalWork = descripTableNode!.querySelector('dd')!.querySelector('dl')!.querySelectorAll('dd')[3]!.innerHTML;
      let CM = hourTableNode!.querySelectorAll('td')[0]!.textContent;
      let CMTD = hourTableNode!.querySelectorAll('td')[1]!.textContent;
      let TD = hourTableNode!.querySelectorAll('td')[2]!.textContent;
      let TP = hourTableNode!.querySelectorAll('td')[3]!.textContent;
      let terrain = hourTableNode!.querySelectorAll('td')[4]!.textContent;
      let projet = hourTableNode!.querySelectorAll('td')[5]!.textContent;

      let description = descripTableNode!.children[5]!.textContent!.trim();
      let context = descripTableNode!.children[7]!.textContent!.trim();
      let content = descripTableNode!.children[9]!.textContent!.trim();

      if(Array.from(dom.window.document.getElementsByClassName('listeDescendants')).length > 0){    //the module have child (subjects associated to it)
        let modules = Array.from(dom.window.document.getElementsByClassName('listeDescendants')[0].children[1].children).map(subject => {
          let subjectSplit = (subject as Element)!.querySelector('p')!.textContent!.split(':');
          let id = subjectSplit[0].trim();
          let title = subjectSplit[1].trim();
          return {'id':id, 'title':title};
        });

        details = {'personalWork':personalWork ,
          'CM':CM ,
          'TD':TD ,
          'CMTD':CMTD ,
          'TP':TP ,
          'Projet':projet ,
          'Terrain':terrain ,
          'description':description ,
          'context':context ,
          'content':content,
          'modules':modules
        };

        res.type('application/json');
        res.status(200);
      }
      else{ //the module don't have child (no subject associated to it)
        details = {'personalWork':personalWork ,
          'CM':CM ,
          'TD':TD ,
          'CMTD':CMTD ,
          'TP':TP ,
          'Projet':projet ,
          'Terrain':terrain ,
          'description':description ,
          'context':context ,
          'content':content,
          'modules':[]
        };
        res.type('application/json');
        res.status(200);
      }
    } catch(error){
      console.log('Problem while scrapping HTML (element not found)');
      details = {'error':'can\'t get elements'};
      res.status(500);
    }

    res.send(details); //Send the response
  });
};


export const getYearDetails = async (yearId: string, year: string, res: Response) => {
  Request.get('https://sagesse.polytech.umontpellier.fr/syllabus/'+yearId+'/'+year, (error: object, response: ResponseReq, body: string) => {
    if(error) {
      let errorMsg = {'error':'Problem while getting page'};
      res.status(500);
      res.send(errorMsg);
      return console.dir(error);
    }
    const dom = new JSDOM(body);

    let details: object = {};

    try{
      let descripTableNode = dom.window.document.getElementsByClassName('syllabus-elp')[0].querySelector('dl');
      let hourTableNode = descripTableNode!.querySelector('dd')!.querySelector('dl')!.querySelectorAll('dd')[4]!.querySelector('tbody')!.querySelector('tr');

      let personalWork = descripTableNode!.querySelector('dd')!.querySelector('dl')!.querySelectorAll('dd')[3]!.innerHTML;
      let CM = hourTableNode!.querySelectorAll('td')[0]!.textContent;
      let CMTD = hourTableNode!.querySelectorAll('td')[1]!.textContent;
      let TD = hourTableNode!.querySelectorAll('td')[2]!.textContent;
      let TP = hourTableNode!.querySelectorAll('td')[3]!.textContent;
      let terrain = hourTableNode!.querySelectorAll('td')[4]!.textContent;
      let projet = hourTableNode!.querySelectorAll('td')[5]!.textContent;

      let description = descripTableNode!.children[5]!.textContent!.trim();
      let context = descripTableNode!.children[7]!.textContent!.trim();
      let content = descripTableNode!.children[9]!.textContent!.trim();

      let semesters = Array.from(dom.window.document.getElementsByClassName('listeDescendants')[0].children[1].children).map(subject => {
        let subjectSplit = (subject as Element)!.querySelector('p')!.textContent!.split(':');
        let id = subjectSplit[0].trim();
        let title = subjectSplit[1].trim();
        return {'id':id, 'title':title};
      });

      details = {'personalWork':personalWork ,
        'CM':CM ,
        'TD':TD ,
        'CMTD':CMTD ,
        'TP':TP ,
        'Projet':projet ,
        'Terrain':terrain ,
        'description':description ,
        'context':context ,
        'content':content ,
        'semesters':semesters
      };

      res.type('application/json');
      res.status(200);

    } catch(error){
      console.log('Problem while scrapping HTML (element not found)');
      details = {'error':'can\'t get elements'};
      res.status(500);
    }

    res.send(details); //Send the response
  });
};
