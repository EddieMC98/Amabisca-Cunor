export class ConstantesModule {
}
export interface ConstantesConfig {
  BASE_URL:string,
  BASE_URL_IMG:string
}

export const APPCONFIG:ConstantesConfig = {
  //LOCAL
  //BASE_URL: 'http://localhost:5000/api/',
  //BASE_URL_IMG: 'http://localhost:5000/'

  //TEST
  BASE_URL: 'http://138.197.228.145:8080/api/',
  BASE_URL_IMG: 'http://138.197.228.145:8080/'




};
