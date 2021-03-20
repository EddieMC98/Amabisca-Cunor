import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { Donacion } from "../modelos/donacion";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class DonacionService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Donacion[]>  {
        return this.http.get<Donacion[]>(APPCONFIG.BASE_URL+"/donacion");
      }
     
      findById(id: number): Observable<Donacion> {
        return this.http.get<Donacion>(APPCONFIG.BASE_URL+"/donacion/" + id);
      }
     
      guardar(item: Donacion): Observable<Donacion> {
        return this.http.post<Donacion>(APPCONFIG.BASE_URL+"/donacion",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/donacion/"+id);
      }
     
      actualizar(item: Donacion): Observable<Donacion> {
        return this.http.put<Donacion>(APPCONFIG.BASE_URL+"/donacion",item);
      }
}