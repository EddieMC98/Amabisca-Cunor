import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoIntercambio } from "../modelos/tipo-intercambio";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class TipoIntercambioService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoIntercambio[]>  {
    return this.http.get<TipoIntercambio[]>(APPCONFIG.BASE_URL+"/tipointercambio");
    }
}
