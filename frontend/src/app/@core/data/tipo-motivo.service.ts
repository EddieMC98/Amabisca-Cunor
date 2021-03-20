import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoMotivo } from "../modelos/tipo-motivo";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class TipoMotivoService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoMotivo[]>  {
        return this.http.get<TipoMotivo[]>(APPCONFIG.BASE_URL+"/tipomotivo");
      }
     
      findById(id: number): Observable<TipoMotivo[]> {
        return this.http.get<TipoMotivo[]>(APPCONFIG.BASE_URL+"/tipomotivo/estado/" + id);
      }
     
      guardar(item: TipoMotivo): Observable<TipoMotivo> {
        return this.http.post<TipoMotivo>(APPCONFIG.BASE_URL+"/tipomotivo",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/tipomotivo/"+id);
      }
     
      actualizar(item: TipoMotivo): Observable<TipoMotivo> {
        return this.http.put<any>(APPCONFIG.BASE_URL+"/tipomotivo",item);
      }
}
