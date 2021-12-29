//Denna service skapades med hjälp utav terminalen (ng g s log)

export class LogService {

  constructor() { }

  //Tar emot logText som argument. Texten som loggas står i vår StarWarsService där vi kallar på LogService
  writeLog(logText:string){
    console.log(logText)
  }
}
