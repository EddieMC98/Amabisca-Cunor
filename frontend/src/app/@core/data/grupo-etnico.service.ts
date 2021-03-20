import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { GrupoEtnico } from "../modelos/grupo-etnico";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class GrupoEtnicoService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<GrupoEtnico[]>  {
        return this.http.get<GrupoEtnico[]>(APPCONFIG.BASE_URL+"/grupoetnico");
      }
     
      findById(id: number): Observable<GrupoEtnico> {
        return this.http.get<GrupoEtnico>(APPCONFIG.BASE_URL+"/grupoetnico/" + id);
      }
     
      guardar(item: GrupoEtnico): Observable<GrupoEtnico> {
        return this.http.post<GrupoEtnico>(APPCONFIG.BASE_URL+"/grupoetnico",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/grupoetnico/"+id);
      }
     
      actualizar(item: GrupoEtnico): Observable<GrupoEtnico> {
        return this.http.put<GrupoEtnico>(APPCONFIG.BASE_URL+"/grupoetnico",item);
      }
}