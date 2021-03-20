import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoResSerologia } from "../modelos/tipo-res-serologia";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class TipoResSerologiaService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoResSerologia[]>  {
        return this.http.get<TipoResSerologia[]>(APPCONFIG.BASE_URL+"/tiporesserologia");
      }
}
