import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { DonacionExterna } from "../modelos/donacion-externa";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class DonacionExternaService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<DonacionExterna[]>  {
        return this.http.get<DonacionExterna[]>(APPCONFIG.BASE_URL+"/donacionexterna");
      }
     
      findById(id: number): Observable<DonacionExterna> {
        return this.http.get<DonacionExterna>(APPCONFIG.BASE_URL+"/donacionexterna/" + id);
      }
     
      guardar(item: DonacionExterna): Observable<DonacionExterna> {
        return this.http.post<DonacionExterna>(APPCONFIG.BASE_URL+"/donacionexterna",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/donacionexterna/"+id);
      }
     
      actualizar(item: DonacionExterna): Observable<DonacionExterna> {
        return this.http.put<DonacionExterna>(APPCONFIG.BASE_URL+"/donacionexterna",item);
      }
}