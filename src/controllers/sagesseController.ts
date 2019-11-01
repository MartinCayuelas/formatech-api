const Request = require('request')
const jsdom = require('jsdom')
const { JSDOM } = jsdom


export const getSubjectDetails = async (subjectId: string, year: string, res: any) => {
  Request.get("https://sagesse.polytech.umontpellier.fr/syllabus/"+subjectId+"/"+year, (error: any, response: any, body: any) => {
    if(error) {
        return console.dir(error);
    }
    const dom = new JSDOM(body)

    let descripTableNode = dom.window.document.getElementsByClassName("syllabus-elp")[0].querySelector("dl")
    let hourTableNode = descripTableNode.querySelector("dd").querySelector("dl").querySelectorAll("dd")[4].querySelector("tbody").querySelector("tr")

    let personalWork = descripTableNode.querySelector("dd").querySelector("dl").querySelectorAll("dd")[3].innerHTML
    let CM = hourTableNode.querySelectorAll("td")[0].textContent
    let CMTD = hourTableNode.querySelectorAll("td")[1].textContent
    let TD = hourTableNode.querySelectorAll("td")[2].textContent
    let TP = hourTableNode.querySelectorAll("td")[3].textContent
    let terrain = hourTableNode.querySelectorAll("td")[4].textContent
    let projet = hourTableNode.querySelectorAll("td")[5].textContent

    let description = descripTableNode.children[5].textContent
    let context = descripTableNode.children[7].textContent
    let content = descripTableNode.children[9].textContent

    let details = {
      "personalWork":personalWork ,
      "CM":CM ,
      "TD":TD ,
      "CMTD":CMTD ,
      "TP":TP ,
      "Projet":projet ,
      "Terrain":terrain ,
      "description":description ,
      "context":context ,
      "content":content }

      res.type('application/json');
      res.status(200);
      res.send(details); //Send the response
  })
};



export const getModuleDetails = async (moduleId: string, year: string, res: any) => {
  Request.get("https://sagesse.polytech.umontpellier.fr/syllabus/"+moduleId+"/"+year, (error: any, response: any, body: any) => {
    if(error) {
        return console.dir(error);
    }
    const dom = new JSDOM(body)

    let descripTableNode = dom.window.document.getElementsByClassName("syllabus-elp")[0].querySelector("dl")
    let hourTableNode = descripTableNode.querySelector("dd").querySelector("dl").querySelectorAll("dd")[4].querySelector("tbody").querySelector("tr")

    let personalWork = descripTableNode.querySelector("dd").querySelector("dl").querySelectorAll("dd")[3].innerHTML
    let CM = hourTableNode.querySelectorAll("td")[0].textContent
    let CMTD = hourTableNode.querySelectorAll("td")[1].textContent
    let TD = hourTableNode.querySelectorAll("td")[2].textContent
    let TP = hourTableNode.querySelectorAll("td")[3].textContent
    let terrain = hourTableNode.querySelectorAll("td")[4].textContent
    let projet = hourTableNode.querySelectorAll("td")[5].textContent

    let description = descripTableNode.children[5].textContent
    let context = descripTableNode.children[7].textContent
    let content = descripTableNode.children[9].textContent

    let subjects = Array.from(dom.window.document.getElementsByClassName("listeDescendants")[0].children[1].children).map(subject => {
      if(subject instanceof Element){
        let subjectSplit = subject!.querySelector("p")!.textContent!.split(":")
        let id = subjectSplit[0].trim()
        let title = subjectSplit[1].trim()
        return {"id":id, "title":title}
      }
      else{

      }
    })

    let details = {
      "personalWork":personalWork ,
      "CM":CM ,
      "TD":TD ,
      "CMTD":CMTD ,
      "TP":TP ,
      "Projet":projet ,
      "Terrain":terrain ,
      "description":description ,
      "context":context ,
      "content":content ,
      "subjects":subjects }

      res.type('application/json');
      res.status(200);
      res.send(details); //Send the response
  })
};


export const getFormationDetails = async (formationId: string, year: string, res: any) => {
  Request.get("https://sagesse.polytech.umontpellier.fr/structures/"+formationId+"/"+year, (error:any, response:any, body:any) => {
    if(error) {
        return console.dir(error);
    }
    const dom = new JSDOM(body)

    let years = Array.from(dom.window.document.getElementsByClassName("etape")).map(etape => {
      if(etape instanceof Element){
        let etapeId = etape!.querySelector("header")!.querySelector("div")!.querySelector("div")!.children[1]!.querySelector("p")!.textContent!.split("-")[0]!.trim()
        return {
          "id":etapeId
        }
      }
    })

    res.type('application/json');
    res.status(200);
    res.send(years); //Send the response
  })
};


export const getSemesterDetails = async (semesterId: string, year: string, res: any) => {
  Request.get("https://sagesse.polytech.umontpellier.fr/syllabus/"+semesterId+"/"+year, (error: any, response: any, body: any) => {
    if(error) {
        return console.dir(error);
    }
    const dom = new JSDOM(body)

    let descripTableNode = dom.window.document.getElementsByClassName("syllabus-elp")[0].querySelector("dl")
    let hourTableNode = descripTableNode.querySelector("dd").querySelector("dl").querySelectorAll("dd")[4].querySelector("tbody").querySelector("tr")

    let personalWork = descripTableNode.querySelector("dd").querySelector("dl").querySelectorAll("dd")[3].innerHTML
    let CM = hourTableNode.querySelectorAll("td")[0].textContent
    let CMTD = hourTableNode.querySelectorAll("td")[1].textContent
    let TD = hourTableNode.querySelectorAll("td")[2].textContent
    let TP = hourTableNode.querySelectorAll("td")[3].textContent
    let terrain = hourTableNode.querySelectorAll("td")[4].textContent
    let projet = hourTableNode.querySelectorAll("td")[5].textContent

    let description = descripTableNode.children[5].textContent
    let context = descripTableNode.children[7].textContent
    let content = descripTableNode.children[9].textContent

    let modules = Array.from(dom.window.document.getElementsByClassName("listeDescendants")[0].children[1].children).map(subject => {
      if(subject instanceof Element){
        let subjectSplit = subject!.querySelector("p")!.textContent!.split(":")
        let id = subjectSplit[0].trim()
        let title = subjectSplit[1].trim()
        return {"id":id, "title":title}
      }
    })

    let details = {"personalWork":personalWork ,
      "CM":CM ,
      "TD":TD ,
      "CMTD":CMTD ,
      "TP":TP ,
      "Projet":projet ,
      "Terrain":terrain ,
      "description":description ,
      "context":context ,
      "content":content ,
      "modules":modules }

      res.type('application/json');
      res.status(200);
      res.send(details); //Send the response
  })
};


export const getYearDetails = async (yearId: string, year: string, res: any) => {
  Request.get("https://sagesse.polytech.umontpellier.fr/syllabus/"+yearId+"/"+year, (error: any, response: any, body: any) => {
    if(error) {
        return console.dir(error);
    }
    const dom = new JSDOM(body)

    let descripTableNode = dom.window.document.getElementsByClassName("syllabus-elp")[0].querySelector("dl")
    let hourTableNode = descripTableNode.querySelector("dd").querySelector("dl").querySelectorAll("dd")[4].querySelector("tbody").querySelector("tr")

    let personalWork = descripTableNode.querySelector("dd").querySelector("dl").querySelectorAll("dd")[3].innerHTML
    let CM = hourTableNode.querySelectorAll("td")[0].textContent
    let CMTD = hourTableNode.querySelectorAll("td")[1].textContent
    let TD = hourTableNode.querySelectorAll("td")[2].textContent
    let TP = hourTableNode.querySelectorAll("td")[3].textContent
    let terrain = hourTableNode.querySelectorAll("td")[4].textContent
    let projet = hourTableNode.querySelectorAll("td")[5].textContent

    let description = descripTableNode.children[5].textContent
    let context = descripTableNode.children[7].textContent
    let content = descripTableNode.children[9].textContent

    let semesters = Array.from(dom.window.document.getElementsByClassName("listeDescendants")[0].children[1].children).map(subject => {
      if(subject instanceof Element){
        let subjectSplit = subject!.querySelector("p")!.textContent!.split(":")
        let id = subjectSplit[0].trim()
        let title = subjectSplit[1].trim()
        return {"id":id, "title":title}
      }
    })

    let details = {"personalWork":personalWork ,
      "CM":CM ,
      "TD":TD ,
      "CMTD":CMTD ,
      "TP":TP ,
      "Projet":projet ,
      "Terrain":terrain ,
      "description":description ,
      "context":context ,
      "content":content ,
      "semesters":semesters }

      res.type('application/json');
      res.status(200);
      res.send(details); //Send the response
  })
};
