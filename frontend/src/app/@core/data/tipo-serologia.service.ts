import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoSerologia } from "../modelos/tipo-serologia";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class TipoSerologiaService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoSerologia[]>  {
        return this.http.get<TipoSerologia[]>(APPCONFIG.BASE_URL+"/tiposerologia");
      }
    
      findAllRapidas(): Observable<TipoSerologia[]>  {
        return this.http.get<TipoSerologia[]>(APPCONFIG.BASE_URL+"/tiposerologia/rapidas");
      }

      findAllNormal(): Observable<TipoSerologia[]>  {
        return this.http.get<TipoSerologia[]>(APPCONFIG.BASE_URL+"/tiposerologia/normal");
      }
     
      findById(id: number): Observable<TipoSerologia> {
        return this.http.get<TipoSerologia>(APPCONFIG.BASE_URL+"/tiposerologia/" + id);
      }
     
      guardar(item: TipoSerologia): Observable<TipoSerologia> {
        return this.http.post<any>(APPCONFIG.BASE_URL+"/tiposerologia",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<any>(APPCONFIG.BASE_URL+"/tiposerologia/"+id);
      }
     
      actualizar(item: TipoSerologia): Observable<TipoSerologia> {
        return this.http.put<any>(APPCONFIG.BASE_URL+"/tiposerologia",item);
      }
}
