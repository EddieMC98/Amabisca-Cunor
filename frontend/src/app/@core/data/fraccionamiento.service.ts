import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { Fraccionamiento } from "../modelos/fraccionamiento";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class FraccionamientoService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Fraccionamiento[]>  {
        return this.http.get<Fraccionamiento[]>(APPCONFIG.BASE_URL+"/fraccionamiento");
      }
     
      findById(id: number): Observable<Fraccionamiento> {
        return this.http.get<Fraccionamiento>(APPCONFIG.BASE_URL+"/fraccionamiento/" + id);
      }
     
      guardar(item: Fraccionamiento): Observable<Fraccionamiento> {
        return this.http.post<Fraccionamiento>(APPCONFIG.BASE_URL+"/fraccionamiento",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/fraccionamiento/"+id);
      }
     
      actualizar(item: Fraccionamiento): Observable<Fraccionamiento> {
        return this.http.put<Fraccionamiento>(APPCONFIG.BASE_URL+"/fraccionamiento",item);
      }
}