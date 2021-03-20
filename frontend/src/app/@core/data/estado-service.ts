import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { Estado } from "../modelos/estado";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class EstadoService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Estado[]>  {
        return this.http.get<Estado[]>(APPCONFIG.BASE_URL+"/estado");
    }
}